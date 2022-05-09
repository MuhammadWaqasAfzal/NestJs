import { Body, Controller, Post } from "@nestjs/common";
import { FormDataRequest } from "nestjs-form-data/dist/decorators/form-data";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('signIn')
    @FormDataRequest()
    signIn(@Body() dto:AuthDto){
      //  console.log(dto);
        return this.authService.signIn(dto);
    }

    @Post('signUp')
    signUp(@Body() dto: AuthDto){
       // console.log(req.body);
       console.log({dto});  

        return  this.authService.signUp(dto);
    }

}