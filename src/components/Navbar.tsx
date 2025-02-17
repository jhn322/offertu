"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold text-xl">
          Offertu
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/api"
            className="text-foreground/80 hover:text-foreground"
          >
            API
          </Link>
          <Link
            href="/karriarer"
            className="text-foreground/80 hover:text-foreground"
          >
            Karriärer
          </Link>
          <Link
            href="/mallar"
            className="text-foreground/80 hover:text-foreground"
          >
            Mallar
          </Link>
        </div>

        {/* Mobile Nav */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full h-full flex flex-col items-center justify-center"
          >
            <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
            <SheetDescription className="sr-only">
              Navigate through the mobile menu
            </SheetDescription>
            <div className="flex flex-col space-y-4 mb-80 items-center">
              <Link
                href="/api"
                className="text-foreground/80 hover:text-foreground text-3xl"
                onClick={() => setIsOpen(false)}
              >
                API
              </Link>
              <Link
                href="/karriarer"
                className="text-foreground/80 hover:text-foreground text-3xl"
                onClick={() => setIsOpen(false)}
              >
                Karriärer
              </Link>
              <Link
                href="/mallar"
                className="text-foreground/80 hover:text-foreground text-3xl"
                onClick={() => setIsOpen(false)}
              >
                Mallar
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
