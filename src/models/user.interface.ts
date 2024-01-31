import { Document } from 'mongoose';

interface User extends Document {
    name: string;
    email: string;
    username: string;
    password: string;
    bio?: string;
    role?: string;
    languagePreferences?: string[];
    twoFactorAuthenticationStatus?: boolean;
    emailPreferences?: {
        marketing: boolean;
        newsletter: boolean;
    };
    subscriptionStatus?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default User;