import User from '../models/user.interface';
import { UserModel } from '../models/User';

class UserService {
    private static instance: UserService;

    private constructor() {}

    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    async getUserById(userId: string): Promise<User | null> {
        try {
            const user = await UserModel.findById(userId).lean(); // Use lean() to convert to plain JS object
            return user as User | null;
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
