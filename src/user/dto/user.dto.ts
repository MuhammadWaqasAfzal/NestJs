
import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class  UserDto {


    @IsEmail()
    @IsNotEmpty()
    email: string

   @IsNotEmpty()
    password: string

    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

}
