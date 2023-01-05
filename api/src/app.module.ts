import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { extname } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from './env/environment';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot(env.db),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
