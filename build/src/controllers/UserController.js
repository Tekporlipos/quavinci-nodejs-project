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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const routing_controllers_1 = require("routing-controllers");
const user_service_1 = require("../services/user.service");
const rateLimitMiddleware_1 = require("../middlewares/rateLimitMiddleware");
const UserValidation_1 = require("../utils/validation/UserValidation");
let UserController = class UserController {
    constructor() {
        this.userService = user_service_1.UserService.getInstance();
    }
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.getAllUsers();
        });
    }
    addNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.addUser(user);
        });
    }
    updateUser(user, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.updateUser(userId, user);
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.deleteUser(userId);
        });
    }
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.getUserById(userId);
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, routing_controllers_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUser", null);
__decorate([
    (0, routing_controllers_1.Post)('/'),
    (0, routing_controllers_1.HttpCode)(201),
    __param(0, (0, routing_controllers_1.Body)({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserValidation_1.UserValidation]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addNewUser", null);
__decorate([
    (0, routing_controllers_1.Patch)('/:userId'),
    (0, routing_controllers_1.HttpCode)(202),
    __param(0, (0, routing_controllers_1.Body)({ validate: true })),
    __param(1, (0, routing_controllers_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserValidation_1.UserValidation, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, routing_controllers_1.Delete)('/:userId'),
    (0, routing_controllers_1.HttpCode)(204),
    __param(0, (0, routing_controllers_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, routing_controllers_1.Get)('/:userId'),
    __param(0, (0, routing_controllers_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
exports.UserController = UserController = __decorate([
    (0, routing_controllers_1.JsonController)('users'),
    (0, routing_controllers_1.UseBefore)(rateLimitMiddleware_1.rateLimitMiddleware),
    __metadata("design:paramtypes", [])
], UserController);
