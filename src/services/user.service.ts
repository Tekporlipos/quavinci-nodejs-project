import User from '../models/user.interface';
import { UserModel } from '../models/User';

export class UserService {
    private static instance: UserService;

    private constructor() {
        // Private constructor to prevent external instantiation
    }

    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    async getUserById(userId: string): Promise<User | null> {
        try {
            const user = await UserModel.findById(userId).lean();
            return user as User | null;
        } catch (error) {
            throw error;
        }
    }

    // Add more methods for user-related operations as needed
}