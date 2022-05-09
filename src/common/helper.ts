

import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";



export  default class Helper{


static async  signToken(userId: any, email:string,jwt:JwtService,config:ConfigService)
{
    

    const payload ={
        sub:userId,
        email,
    };

    return jwt.signAsync(payload,{
        expiresIn:'15m',
        secret : config.get('JWT_SECRET'),
    });

}
}