import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserDto } from './dto';
import { UserService } from './user.service';


@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {

    constructor(private userSerive:UserService){}
    
    @Get('info')
    getMe(@Req() req:Request ) {

        console.log({
            user: req.user
        });
        return req.user;
    }

    @Post('edit')
    editUser(@Req() req:Request, @Body() dto:UserDto)
    {
        console.log(req);
        console.log(dto);
        return this.userSerive.editUsser(dto);
       // return "edit user"
    }
}
