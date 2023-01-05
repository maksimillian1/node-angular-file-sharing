import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { env } from '../env/environment';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Media } from '../user/media.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: env.secret,
      secretOrPrivateKey: env.secret,
      signOptions: { expiresIn: '60h' },
    }),
    TypeOrmModule.forFeature([User, Media]),
    UserModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    UserService,
    JwtService,
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthModule {
}
