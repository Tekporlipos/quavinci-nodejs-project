"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitMiddleware = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.rateLimitMiddleware = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000, // 5 minute
    limit: 100,
    message: 'Too many requests from this IP, please try again later.',
});
