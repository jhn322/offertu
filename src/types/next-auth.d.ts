import "next-auth";

// Utöka Session-typen med våra egna fält
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  }
}

// Utöka JWT-token med våra egna fält
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
} 