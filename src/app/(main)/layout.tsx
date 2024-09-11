import { validateRequest } from "@/lib/auth";
import SessionProvider from "@/providers/session-provider";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();

  if (!session.user) redirect("/auth");

  return <SessionProvider context={session}>{children}</SessionProvider>;
}
