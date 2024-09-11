"use client";

import { Session, User } from "lucia";
import React from "react";

interface SessionContext {
  user: User;
  session: Session;
}

const SessionContext = React.createContext<SessionContext | null>(null);

export default function SessionProvider({
  children,
  context,
}: React.PropsWithChildren<{ context: SessionContext }>) {
  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = React.useContext(SessionContext);

  if (!context)
    throw new Error("useSession must be used within a SessionProvider");

  return context;
}
