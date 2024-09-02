import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const RegisterSchema = z.object({
  firstName: requiredString,
  lastName: requiredString,
  email: requiredString.email("Invalid email"),
  password: requiredString.min(8, "Must be at least 8 characters"),
});

export type RegisterType = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: requiredString.email("Invalid email"),
  password: requiredString.min(8, "Must be at least 8 characters"),
});

export type LoginType = z.infer<typeof LoginSchema>;
