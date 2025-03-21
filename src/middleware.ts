import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Definiera vilka sidor som är publika (inte behöver autentisering)
  const isPublicPath =
    path === '/admin/login' ||
    !path.startsWith('/admin');

  // Hämta den aktuella JWT-token från begäran
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Om det är en publik sida, tillåt åtkomst
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Om användaren inte är inloggad och försöker nå en admin-sida, 
  // omdirigera till inloggningssidan
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Om användaren är inloggad men inte är admin, omdirigera till startsidan
  if (token.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Annars är användaren inloggad som admin och får tillgång till admin-sidorna
  return NextResponse.next();
}

// Konfigurera vilka sidor middleware ska köras på
export const config = {
  matcher: [
    '/admin/:path*',    // Alla admin-sidor
    '/admin/login'      // Inloggningssidan
  ]
}; 