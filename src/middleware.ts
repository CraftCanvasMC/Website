import { Ratelimiter } from '~/lib/ratelimiter';
import { type NextRequest, NextResponse } from 'next/server';

const ratelimiter = new Ratelimiter({
  paths: {
    '/api/v1/builds': { limit: 50, windowMs: 60_000 },
    '/api/v1/latest': { limit: 30, windowMs: 60_000 },
    '/api/v1/specific': { limit: 30, windowMs: 60_000 },
    '/api/v2/builds': { limit: 50, windowMs: 60_000 },
    '/api/v2/builds/latest': { limit: 30, windowMs: 60_000 },
  },
});

export const config = {
  // Run middleware on all routes to set language cookie; rate-limit only applies to API paths
  matcher: ['/(.*)'],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle API rate limiting
  if (pathname.startsWith('/api/')) {
    const result = ratelimiter.evaluate(request);
    if (!result) return NextResponse.next();
    if (!result.isAllowed) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: result.headers });
    }
    const response = NextResponse.next();
    Object.entries(result.headers).forEach(([key, value]) => response.headers.set(key, value));
    return response;
  }

  // Language detection and cookie setting for non-API routes
  const existingLang = request.cookies.get('lang')?.value;
  let lang = existingLang;

  if (!lang) {
    const countryHeader =
      request.headers.get('x-vercel-ip-country') ||
      request.headers.get('x-country') ||
      request.headers.get('cf-ipcountry') ||
      (request.geo?.country ?? '');
    const acceptLang = (request.headers.get('accept-language') || '').toLowerCase();

    if (countryHeader?.toUpperCase() === 'TR') {
      lang = 'tr';
    } else if (acceptLang.startsWith('tr') || acceptLang.includes('tr-')) {
      lang = 'tr';
    } else {
      lang = 'en';
    }
  }

  const response = NextResponse.next();
  if (lang && (lang === 'tr' || lang === 'en')) {
    response.cookies.set('lang', lang, { path: '/', httpOnly: false, sameSite: 'lax', maxAge: 60 * 60 * 24 * 365 });
  }
  return response;
}
