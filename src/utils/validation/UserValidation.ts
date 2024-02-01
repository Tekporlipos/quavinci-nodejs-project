import {IsString, IsEmail, IsOptional, IsNotEmpty} from 'class-validator';

export class UserValidation {

    @IsString()
    @IsOptional()
    id?: string;


    @IsString()
    @IsNotEmpty()
    name: string | undefined;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string | undefined;

    @IsString()
    @IsNotEmpty()
    username: string | undefined;

    @IsString()
    @IsOptional()
    bio?: string;

    @IsString()
    @IsOptional()
    role?: string;

    @IsString()
    @IsOptional()
    subscriptionStatus?: string;
}
