"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const routing_controllers_1 = require("routing-controllers");
const class_validator_1 = require("class-validator");
const User_1 = require("../models/User");
const rateLimitMiddleware_1 = require("../middlewares/rateLimitMiddleware");
const logger_1 = __importDefault(require("../utils/logger"));
let UserController = class UserController {
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate userId
                const errors = yield (0, class_validator_1.validate)({ userId });
                if (errors.length > 0) {
                    throw new routing_controllers_1.NotFoundError('User not found');
                }
                // Retrieve user from the database
                const user = yield User_1.UserModel.findOne({ _id: userId });
                if (!user) {
                    throw new routing_controllers_1.NotFoundError('User not found');
                }
                // Log request and response
                logger_1.default.info(`GET /api/users/${userId}`);
                logger_1.default.info('Response:', user);
                return user;
            }
            catch (error) {
                // Log errors
                logger_1.default.error('Error:', error.message);
                // Return consistent error response
                throw error;
            }
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, routing_controllers_1.Get)('/:userId'),
    (0, routing_controllers_1.UseBefore)(rateLimitMiddleware_1.rateLimitMiddleware),
    __param(0, (0, routing_controllers_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
exports.UserController = UserController = __decorate([
    (0, routing_controllers_1.JsonController)('/api/users')
], UserController);
