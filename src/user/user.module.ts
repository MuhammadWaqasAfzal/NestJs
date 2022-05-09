import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { NestjsFormDataModule } from "nestjs-form-data";
import { JwtModule } from "@nestjs/jwt";


@Module({
  controllers: [UserController],
  providers: [UserService],
  imports : [NestjsFormDataModule,JwtModule.register({
        
  })],
})
export class UserModule {
  
}
