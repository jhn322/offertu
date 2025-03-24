'use client';

// import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSession, signOut } from 'next-auth/react';

interface NavItem {
  href: string;
  label: string;
}

// Grundläggande navigationslänkar som alla besökare kan se
const publicNavItems: NavItem[] = [
  { href: '/api-dokumentation', label: 'API' },
  { href: '/karriarer', label: 'Karriärer' },
  { href: '/mallar', label: 'Mallar' },
  { href: '/nyheter', label: 'Nyheter' },
  { href: '/verktyg-resurser', label: 'Verktyg' },
];

// Rollspecifika navigationslänkar
const roleBasedNavItems: Record<string, NavItem[]> = {
  ADMIN: [
    { href: '/dashboard', label: 'Dashboard' },
    // Fler admin-specifika länkar kan läggas till här
  ],
  // Du kan lägga till fler roller här i framtiden
  // USER: [{ href: '/profil', label: 'Min Profil' }],
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // Hämta aktuell session från NextAuth
  const { data: session, status } = useSession();

  // Kontrollera om användaren är inloggad
  const isAuthenticated = status === 'authenticated';
  // Hämta användarens roll om inloggad
  const userRole = session?.user?.role;

  // Bygg upp dynamisk navlista baserat på användarstatus och roll
  const navItems = [...publicNavItems];

  // Lägg till rollspecifika alternativ om användaren har en roll
  if (isAuthenticated && userRole && roleBasedNavItems[userRole]) {
    navItems.push(...roleBasedNavItems[userRole]);
  }

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when screen becomes larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <div className="h-16" />
      <div className="relative">
        {/* Main Navbar */}
        <nav
          className={`fixed z-50 top-0 left-0 right-0 w-full border-b transition-colors duration-500 ${
            isOpen ? 'bg-background' : 'bg-background/80 backdrop-blur-sm'
          }`}
        >
          <div className="container mx-auto flex h-16 items-center justify-between">
            <Link
              href="/"
              className="font-semibold text-xl"
              onClick={() => setIsOpen(false)}
            >
              Offertu
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              {/* Visa utloggningsknapp endast om användaren är inloggad */}
              {isAuthenticated && (
                <Button
                  variant="outline"
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="ml-2"
                >
                  Logga ut
                </Button>
              )}

              {/* Visa inloggningsknapp om användaren inte är inloggad */}
              {!isAuthenticated && (
                <Link href="/admin/login">
                  <Button variant="outline" className="ml-2">
                    Logga in
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative md:hidden hover:bg-transparent p-0 h-14 w-14"
              onClick={handleToggleMenu}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative flex items-center justify-center">
                {/* Transform transition lines */}
                <span
                  className={`absolute h-[2px] rounded-full bg-foreground transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'w-5 rotate-45 translate-y-0'
                      : 'w-5 -translate-y-1.5'
                  }`}
                />
                <span
                  className={`absolute h-[2px] rounded-full bg-foreground transition-all duration-300 ease-in-out ${
                    isOpen ? 'w-0 opacity-0' : 'w-5 opacity-100'
                  }`}
                />
                <span
                  className={`absolute h-[2px] rounded-full bg-foreground transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'w-5 -rotate-45 translate-y-0'
                      : 'w-5 translate-y-1.5'
                  }`}
                />
              </div>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-40 bg-background transition-transform duration-500 ease-in-out md:hidden ${
            isOpen ? 'translate-y-16' : 'translate-y-[-100%]'
          }`}
        >
          <div className="container mx-auto px-4 py-8 h-[calc(100vh-4rem)] flex flex-col">
            <div className="flex flex-col items-center justify-center h-full -mt-20 space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-3xl text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Lägg till mobilversioner av inloggnings-/utloggningsknappar */}
              {isAuthenticated && (
                <Button
                  variant="outline"
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="mt-4 w-full"
                >
                  Logga ut
                </Button>
              )}

              {!isAuthenticated && (
                <Link
                  href="/admin/login"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Button variant="outline" className="mt-4 w-full">
                    Logga in
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
