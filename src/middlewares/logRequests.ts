import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const logRequests = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const startTime = new Date();
    logger.info({
        timestamp: startTime.toISOString(),
        method: req.method,
        url: req.url,
        clintIp: req.ip,
    });

    res.once('finish', () => {
        const endTime = new Date();
        const responseTime = endTime.getTime() - startTime.getTime();
        logger.info({
            timestamp: endTime.toISOString(),
            method: req.method,
            url: req.url,
            status: res.statusCode,
            responseTime: `${responseTime}ms`,
        });
    });

    next();
};

export const logErrors = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error({
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        status: err.status || 500,
        error: err.message,
    });

    next(err);
};
