import IUser from '../models/user.interface';
import {UserModel} from '../models/User';
import {BadRequestError, NotFoundError} from 'routing-controllers';
import {CustomResponse} from "../utils/IResponseBody";
import mongoose from "mongoose";
import {UserValidation} from "../utils/validation/UserValidation";

export class UserService {
    private static instance: UserService;

    private constructor() {}

    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    async getUserById(userId: string): Promise<CustomResponse>{
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new BadRequestError('Invalid userId format');
        }
        try {
            return UserModel.findById(userId).lean().then((user:any) => {
                const userObject = user.toObject();
                return { status: "Success", message: "User data retried successfully", data: { ...userObject, id: user._id.toString() } as IUser };
            });
        } catch (error: any) {
            throw new NotFoundError(error.message);
        }
    }

    async addUser(user: UserValidation): Promise<CustomResponse> {
        return UserModel.create(user)
            .then((createdUser:any) => {
                const userObject = createdUser.toObject();
                return { status: "Success", message: "User added successfully", data: { ...userObject, id: createdUser._id.toString() } as IUser };
            })
            .catch((error) => {
                throw new Error(`Error adding user: ${error.message}`);
            });
    }



    async updateUser(userId: string, updatedUser: UserValidation): Promise<CustomResponse | null> {
        try {
            return UserModel.findByIdAndUpdate(userId, updatedUser, { new: true }).lean().then((user:any) => {
                const userObject = user.toObject();
                return { status: "Success", message: "User updated successfully", data: { ...userObject, id: user._id.toString() } as IUser };
            });
        } catch (error: any) {
            throw new NotFoundError(error.message);
        }
    }

    async deleteUser(userId: string): Promise<CustomResponse> {
        try {
           UserModel.findByIdAndDelete(userId);
            return  { status: "Success", message: "User deleted successfully", data: null };
        } catch (error:any) {
            throw new NotFoundError(error.message);
        }
    }

    async getAllUsers(): Promise<CustomResponse> {
        return UserModel.find({}).lean().exec()
            .then(users => {
                if (users && users.length > 0) {
                    users.forEach((user:any) => {
                        if (user._id) user.id = user._id.toString();
                    });
                }
                return { status: "Success", message: 'User data retried successfully', data: users as IUser[] };
            })
            .catch(error => {
                throw new NotFoundError(error.message);
            });
    }

}
