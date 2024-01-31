import rateLimit from 'express-rate-limit';

export const rateLimitMiddleware = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // Max requests per minute
    message: 'Too many requests from this IP, please try again later.',
});
