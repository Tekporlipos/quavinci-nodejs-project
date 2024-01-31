import IUser from '../models/user.interface';
import {UserModel} from '../models/User';
import {NotFoundError} from 'routing-controllers';

export class UserService {
    private static instance: UserService;

    private constructor() {}

    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    async getUserById(userId: string): Promise<IUser>{
        try {
            return UserModel.findById(userId).lean().then((user:any) => {
                const userObject = user.toObject();
                return { ...userObject, id: user._id.toString() };
            });
        } catch (error: any) {
            throw new NotFoundError(error.message);
        }
    }

    async addUser(user: IUser): Promise<IUser> {
        return UserModel.create(user)
            .then((createdUser:any) => {
                const userObject = createdUser.toObject();
                return { ...userObject, id: createdUser._id.toString() };
            })
            .catch((error) => {
                throw new Error(`Error adding user: ${error.message}`);
            });
    }



    async updateUser(userId: string, updatedUser: IUser): Promise<IUser | null> {
        try {
            return UserModel.findByIdAndUpdate(userId, updatedUser, { new: true }).lean().then((user:any) => {
                const userObject = user.toObject();
                return { ...userObject, id: user._id.toString() };
            });
        } catch (error: any) {
            throw new NotFoundError(error.message);
        }
    }

    async deleteUser(userId: string): Promise<{ message: string }> {
        try {
           UserModel.findByIdAndDelete(userId);
            return { message: 'User deleted successfully' };
        } catch (error:any) {
            throw new NotFoundError(error.message);
        }
    }

    async getAllUsers(): Promise<IUser[]> {
        return UserModel.find({}).lean().exec()
            .then(users => {
                if (users && users.length > 0) {
                    users.forEach((user:any) => {
                        if (user._id) user.id = user._id.toString();
                    });
                }
                return users as IUser[];
            })
            .catch(error => {
                throw new NotFoundError(error.message);
            });
    }

}
