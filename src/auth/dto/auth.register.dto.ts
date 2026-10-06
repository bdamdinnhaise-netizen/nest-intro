import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsEmail()
    email: string;

    // bcrypt only uses the first 72 bytes of the password
    @IsString()
    @MinLength(8)
    @MaxLength(72)
    password: string;
}