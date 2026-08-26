import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, locales, type Locale } from '@/lib/i18n';

const PUBLIC_FILE = /\.[^/]+$/;
const PROTECTED_PATHS = ['/profile', '/become-creator', '/creator/dashboard'];
const AUTH_ONLY_PATHS = ['/auth/login', '/auth/signup'];

function localeFromPath(pathname: string): Locale | null {
  const segment = pathname.split('/')[1];
  return locales.includes(segment as Locale) ? (segment as Locale) : null;
}

function stripLocale(pathname: string): string {
  const segments = pathname.split('/');
  if (locales.includes(segments[1] as Locale)) {
    const stripped = `/${segments.slice(2).join('/')}`;
    return stripped === '/' ? '/' : stripped.replace(/\/$/, '');
  }
  return pathname;
}

function matchesRoute(pathname: string, routes: string[]) {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const locale = localeFromPath(pathname);
  if (!locale) {
    const destination = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(new URL(`${destination}${search}`, request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-rozi-locale', locale);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  const pathWithoutLocale = stripLocale(pathname);
  const isProtected = matchesRoute(pathWithoutLocale, PROTECTED_PATHS);
  const isAuthOnly = matchesRoute(pathWithoutLocale, AUTH_ONLY_PATHS);

  // Public frontend routes deliberately stop here: no auth or Supabase request is
  // needed to render the Phase 22B foundation. Auth behavior remains available
  // on the routes that require it so backend reconnection is not removed.
  if (!isProtected && !isAuthOnly) return response;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return response;

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();

  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = `/${locale}/auth/login`;
    loginUrl.searchParams.set('next', pathname);
    const redirect = NextResponse.redirect(loginUrl);
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    return redirect;
  }

  if (isAuthOnly && user) {
    const profileUrl = request.nextUrl.clone();
    profileUrl.pathname = `/${locale}/profile`;
    profileUrl.searchParams.delete('next');
    const redirect = NextResponse.redirect(profileUrl);
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    return redirect;
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
