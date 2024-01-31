import { Document } from 'mongoose';

interface IUser extends Document {
    id?: string;
    name: string;
    email: string;
    username: string;
    bio?: string;
    role?: string;
    subscriptionStatus?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default IUser;