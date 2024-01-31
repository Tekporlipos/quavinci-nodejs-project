"use strict";
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
exports.UserService = void 0;
const User_1 = require("../models/User");
const routing_controllers_1 = require("routing-controllers");
class UserService {
    constructor() { }
    static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return User_1.UserModel.findById(userId).lean().then((user) => {
                    const userObject = user.toObject();
                    return Object.assign(Object.assign({}, userObject), { id: user._id.toString() });
                });
            }
            catch (error) {
                throw new routing_controllers_1.NotFoundError(error.message);
            }
        });
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.UserModel.create(user)
                .then((createdUser) => {
                const userObject = createdUser.toObject();
                return Object.assign(Object.assign({}, userObject), { id: createdUser._id.toString() });
            })
                .catch((error) => {
                throw new Error(`Error adding user: ${error.message}`);
            });
        });
    }
    updateUser(userId, updatedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return User_1.UserModel.findByIdAndUpdate(userId, updatedUser, { new: true }).lean().then((user) => {
                    const userObject = user.toObject();
                    return Object.assign(Object.assign({}, userObject), { id: user._id.toString() });
                });
            }
            catch (error) {
                throw new routing_controllers_1.NotFoundError(error.message);
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                User_1.UserModel.findByIdAndDelete(userId);
                return { message: 'User deleted successfully' };
            }
            catch (error) {
                throw new routing_controllers_1.NotFoundError(error.message);
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.UserModel.find({}).lean().exec()
                .then(users => {
                if (users && users.length > 0) {
                    users.forEach((user) => {
                        if (user._id)
                            user.id = user._id.toString();
                    });
                }
                return users;
            })
                .catch(error => {
                throw new routing_controllers_1.NotFoundError(error.message);
            });
        });
    }
}
exports.UserService = UserService;
