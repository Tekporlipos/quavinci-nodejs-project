// models/user.model.ts
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({
    options: { allowMixed: 0 }, // Set allowMixed to 0 to disable the warning
    schemaOptions: { collection: 'users' },
})
class User {
    @prop({ required: true })
    name!: string;

    @prop({ required: true, unique: true })
    email!: string;

    @prop({ type: () => Object }) // Set languagePreferences as Mixed type
    languagePreferences?: any; // 'any' here is used to represent the Mixed type

    @prop({ type: () => Object }) // Set emailPreferences as Mixed type
    emailPreferences?: any; // 'any' here is used to represent the Mixed type

    @prop({ default: Date.now })
    createdAt?: Date;

    @prop({ default: Date.now })
    updatedAt?: Date;
}

export const UserModel = getModelForClass(User);
