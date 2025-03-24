import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Definiera vilka sidor som är publika (inte behöver autentisering)
  const isPublicPath =
    path === '/admin/login' ||
    (!path.startsWith('/admin') &&
      path !== '/dashboard' &&
      !path.startsWith('/dashboard/'));

  // Hämta den aktuella JWT-token från begäran
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Om det är en publik sida, tillåt åtkomst
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Om användaren inte är inloggad och försöker nå en skyddad sida, 
  // omdirigera till inloggningssidan
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // För dashboard-specifik åtkomst
  if (path === '/dashboard' || path.startsWith('/dashboard/')) {
    // Kontrollera om användaren har Admin-roll för att komma åt dashboard
    if (token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  // Annars är användaren inloggad som admin och får tillgång till admin-sidorna
  else if (path.startsWith('/admin') && token.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Annars är användaren behörig och får tillgång till sidan
  return NextResponse.next();
}

// Konfigurera vilka sidor middleware ska köras på
export const config = {
  matcher: [
    '/admin/:path*',    // Alla admin-sidor
    '/admin/login',     // Inloggningssidan
    '/dashboard',       // Dashboard-sidan
    '/dashboard/:path*' // Alla undersidor till dashboard
  ]
}; 