"use server";

import { lucia, validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  LoginSchema,
  LoginType,
  RegisterSchema,
  RegisterType,
} from "@/lib/validations";
import { hash, verify } from "argon2";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerAction(credentials: RegisterType) {
  try {
    const { firstName, lastName, email, password } =
      RegisterSchema.parse(credentials);

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
      hashLength: 32,
    });

    const userId = generateIdFromEntropySize(10);

    const existingEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return {
        error: "Email already taken",
      };
    }

    await prisma.user.create({
      data: {
        id: userId,
        firstName,
        lastName,
        email,
        password: passwordHash,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "Something went wrong. Please try again",
    };
  }
}

export async function loginAction(credentials: LoginType) {
  try {
    const { email, password } = LoginSchema.parse(credentials);

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!existingUser || !existingUser.password) {
      return {
        error: "Incorrect username or password",
      };
    }

    const validPassword = await verify(existingUser.password, password);

    if (!validPassword) {
      return {
        error: "Incorrect username or password",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function logoutAction() {
  const { session } = await validateRequest();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/auth");
}
