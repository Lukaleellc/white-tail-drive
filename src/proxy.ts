import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  // Always allow passage in local development without requiring a password
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  // Get the Basic Auth header from the browser request
  const basicAuth = req.headers.get('authorization');

  // The secret credentials. 
  // We use Vercel Environment variables, but we provide a default backup 
  // just in case they aren't configured during the very first deployment!
  const user = process.env.STAGING_USER || 'Guest';
  const pwd = process.env.STAGING_PASSWORD || 'whitetail101';

  // If no authorization header is found, immediately halt and drop the password box
  if (!basicAuth) {
    return new NextResponse('Authentication required. Please enter the password.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Access Area"',
      },
    });
  }

  // Decode the base64 auth token provided by the browser
  const authValue = basicAuth.split(' ')[1] ?? '';
  const decodedAuth = Buffer.from(authValue, 'base64').toString('utf-8');
  const [providedUser, providedPwd] = decodedAuth.split(':');

  // Check if the typed password matches our secure variables
  if (providedUser === user && providedPwd === pwd) {
    return NextResponse.next();
  }

  // Invalid password provided — trap the user outside
  return new NextResponse('Unauthorized Request', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Access Area"',
    },
  });
}

// Ensure the proxy protects all standard pages, but ignores loading the internal static assets (like images)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
