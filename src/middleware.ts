import { defineMiddleware } from 'astro:middleware';
import { apiRateLimiter } from './lib/ratelimiter';

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, url } = context;
  
  if (url.pathname.startsWith('/api/v2')) {
    const ip = 
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    
    const result = apiRateLimiter.check(ip);
    
    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please try again later.',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(Math.ceil((result.reset - Date.now()) / 1000)),
            'X-RateLimit-Limit': String(100),
            'X-RateLimit-Remaining': String(result.remaining),
            'X-RateLimit-Reset': String(result.reset),
          },
        }
      );
    }
    
    const response = await next();
    response.headers.set('X-RateLimit-Limit', '100');
    response.headers.set('X-RateLimit-Remaining', String(result.remaining));
    response.headers.set('X-RateLimit-Reset', String(result.reset));
    
    return response;
  }
  
  return next();
});
