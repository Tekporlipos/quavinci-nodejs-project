import rateLimit from 'express-rate-limit';

export const rateLimitMiddleware = rateLimit({
    windowMs: 5 *60 * 1000, // 5 minute
    limit: 100,
    message: 'Too many requests from this IP, please try again later.',
});
