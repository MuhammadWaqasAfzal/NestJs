import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    NestjsFormDataModule,

    AuthModule, PrismaModule,BookmarkModule,PrismaModule,UserModule],
  
})
export class AppModule {}
