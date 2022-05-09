import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';
import * as argon from 'argon2';
import Helper from 'src/common/helper';
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class UserService {

    constructor(private prisma:PrismaService,private jwt:JwtService, private config:ConfigService){}



    async editUsser(@Body() userDto:UserDto)
    {
    

        const newHash = await argon.hash(userDto.password);

        const t = await Helper.signToken(userDto.password,userDto.email,this.jwt,this.config);


        const user  = this.prisma.user.update({
            where: {
                email: userDto.email,
              },
              data: {
                firstName: userDto.firstName,
                lastName : userDto.lastName,
                hash : newHash,
                token : t
            
              },
        });
        delete (await user).hash;
        return user;
        
    }
}
