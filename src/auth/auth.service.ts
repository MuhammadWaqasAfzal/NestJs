import { ForbiddenException, Injectable } from "@nestjs/common";
import {User,Bookmark} from '@prisma/client';
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { use } from "passport";


@Injectable()
export class AuthService{

    constructor(private prisma:PrismaService , private jwt:JwtService, private config:ConfigService){}
   async signIn(dto: AuthDto){
        const user = await this.prisma.user.findUnique({
                where : {
                    email: dto.email,
                },
        });

        if(!user)
        {
            throw new ForbiddenException('Incorrect Credentials');
        }

        const pwMatches = await argon.verify(user.hash,dto.password);
        
        if(!pwMatches)
        {
            throw new ForbiddenException('Incorrect Credentials');
        }
        const t = await this.signToken(dto.password,dto.email);
        
        user.token = t;
         delete user.hash;
        return user;
       
    }

    async signUp(dto: AuthDto){

        try{
            const hash = await argon.hash(dto.password);

        
            // const user = await this.prisma.user.create({
            //         data: {
            //         email: dto.email,
            //         hash,
            //         firstName:dto.firstName,
            //         lastName:dto.lastName
            //         },
            //         select:{
            //             id:true,
            //             email:true,
            //             createdAt:true,
            //             firstName:true,
            //             lastName:true,
            //         }
            //     }
            // );
            const t = await this.signToken(dto.password,dto.email);
            const user = await this.prisma.user.create({
                data: {
                email: dto.email,
                hash,
                firstName:dto.firstName,
                lastName:dto.lastName,
                token:t
                }
            }
        );
    
        delete user.hash;
            return user;
        //return this.signToken(user.id,user.email);

        }
        catch(error)
        {
            if(error instanceof PrismaClientKnownRequestError)
            {
                if(error.code === "P2002")
                {
                    throw new ForbiddenException(
                        'Email Already Registered'
                    )
                }
            }
            
                throw error;
        }
       
    }

     async signToken(userId: any, email:string)
    {

        const payload ={
            sub:userId,
            email,
        };

        return this.jwt.signAsync(payload,{
            expiresIn:'15m',
            secret : this.config.get('JWT_SECRET'),
        });

    }

}