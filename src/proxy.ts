import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always permit static assets, favicon, and internal API routes
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname === '/favicon.ico' ||
    pathname.startsWith('/public')
  ) {
    return NextResponse.next();
  }

  // Permit the custom Auth page and its verification API
  if (pathname === '/auth' || pathname === '/api/verify') {
    return NextResponse.next();
  }

  // Check for the authentication cookie
  const authSession = req.cookies.get('auth_session');

  // Permit passage if the cookie is present OR if we are in local development
  if (process.env.NODE_ENV === 'development' || authSession) {
    return NextResponse.next();
  }

  // If unauthenticated, redirect to our custom /auth page
  const url = req.nextUrl.clone();
  url.pathname = '/auth';
  return NextResponse.redirect(url);
}

// Protect all standard pages
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
