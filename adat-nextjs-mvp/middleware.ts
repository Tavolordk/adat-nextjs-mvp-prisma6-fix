import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE } from './src/lib/constants';

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  if (isAdminRoute && !hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
