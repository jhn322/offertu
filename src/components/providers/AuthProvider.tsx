'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

type AuthProviderProps = {
  children: ReactNode;
};

/**
 * Autentiseringsprovider som använder NextAuth SessionProvider
 * Måste användas i en klientkomponent, vanligtvis i root-layouten
 */

export default function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
