import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip middleware for static files, API routes, and Next.js internals
  if (
    path.startsWith('/_next') || 
    path.startsWith('/api') || 
    path.startsWith('/static') ||
    path.includes('.') ||
    path === '/favicon.ico' ||
    path === '/robots.txt' ||
    path === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }

  // Interview-related routes that require authentication
  const isInterviewRoute = path.startsWith('/interview') || 
                          path.startsWith('/top-interviews') || 
                          path.includes('interview-history') ||
                          path.startsWith('/prepare-interviews') ||
                          path.startsWith('/placement-data');

  // Public paths that should redirect to home if logged in
  const isPublicPath = path === '/auth/login' || path === '/auth/signup';
  
  // Login-required page should redirect logged-in users to home
  const isLoginRequired = path === '/auth/login-required';

  // Get token from cookies - simplified approach
  const token = request.cookies.get("token")?.value;
  
  // Simple token presence check (we'll let the API validate the token properly)
  const hasToken = Boolean(token && token.length > 10);

  // Redirect logged-in users away from auth pages
  if ((isPublicPath || isLoginRequired) && hasToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Block interview routes for users without tokens
  if (isInterviewRoute && !hasToken) {
    return NextResponse.redirect(new URL('/auth/login-required', request.url));
  }

  return NextResponse.next();
}

// matcher tells where middleware should run
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, sitemap.xml (static files)
     * - files with extensions (images, css, js, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.).*)',
  ],
};
