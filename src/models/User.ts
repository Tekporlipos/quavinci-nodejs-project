import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
@modelOptions({
    schemaOptions: {
        collection: 'users',
        toJSON: {
            transform: (_, ret) => {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
            },
        },
    },
})
class User {
    @prop({ required: true })
    name!: string;

    @prop({ required: true, unique: true })
    email!: string;

    @prop({ required: true })
    username!: string;

    @prop()
    bio?: string;

    @prop()
    role?: string;

    @prop()
    subscriptionStatus?: string;

    @prop({ default: Date.now })
    createdAt?: Date;

    @prop({ default: Date.now })
    updatedAt?: Date;
}

export const UserModel = getModelForClass(User);
