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
  matcher: ['/api/v1/:path*', '/api/v2/:path*'],
};

export function middleware(request: NextRequest) {
  const result = ratelimiter.evaluate(request);

  if (!result) return NextResponse.next();

  if (!result.isAllowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: result.headers });
  }

  const response = NextResponse.next();
  Object.entries(result.headers).forEach(([key, value]) => response.headers.set(key, value));
  return response;
}
