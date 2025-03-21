import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Exports both GET and POST handlers for API route
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 