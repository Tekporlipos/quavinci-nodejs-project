import { prop, getModelForClass } from '@typegoose/typegoose';

class User {
    // Basic Information
    @prop({ required: true })
    name!: string;

    @prop({ required: true, unique: true })
    email!: string;

    // Profile Information
    @prop()
    bio?: string;

    // Authentication and Authorization
    @prop()
    role?: string; // User role or permissions

    // Preferences
    @prop()
    languagePreferences?: string[];

    // Security Settings
    @prop()
    twoFactorAuthenticationStatus?: boolean;

    // Communication Preferences
    @prop()
    emailPreferences?: {
        marketing: boolean;
        newsletter: boolean;
    };

    // Billing Information
    @prop()
    subscriptionStatus?: string;

}

export const UserModel = getModelForClass(User);
