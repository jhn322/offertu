'use client';

import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';

interface RoleGateProps {
  children: ReactNode;
  allowedRoles: string[];
  fallback?: ReactNode; // Valfri komponent att visa om användaren inte har tillåtelse
}

/**
 * Komponent som villkorligt renderar innehåll baserat på användarroller
 * @param children - Innehållet som ska visas om användaren har tillåtelse
 * @param allowedRoles - Array med roller som är tillåtna att se innehållet
 * @param fallback - Valfri komponent att visa om användaren inte har tillåtelse
 */
export default function RoleGate({
  children,
  allowedRoles,
  fallback = null,
}: RoleGateProps) {
  const { data: session, status } = useSession();

  // Kontrollera om användaren är inloggad och har en tillåten roll
  const isAuthorized =
    status === 'authenticated' &&
    session?.user?.role &&
    allowedRoles.includes(session.user.role);

  // Visa innehållet om användaren är auktoriserad, annars visa fallback eller ingenting
  return isAuthorized ? <>{children}</> : <>{fallback}</>;
}
