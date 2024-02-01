import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
} from 'class-validator';
import mongoose from 'mongoose';

@ValidatorConstraint({ name: 'isMongoId', async: false })
export class IsMongoIdConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        if (!value) {
            return false;
        }

        return mongoose.Types.ObjectId.isValid(value);
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} must be a valid MongoDB ObjectId`;
    }
}

export function IsMongoId(validationOptions?: { message?: string }) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsMongoIdConstraint,
        });
    };
};
