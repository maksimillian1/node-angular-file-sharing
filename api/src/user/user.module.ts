import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { v4 } from 'uuid';
import { Media } from './media.entity';

export const multerOptions = {

  limits: {
    fileSize: 1024 * 1024 * 5,
  },

  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf|webp)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
    }
  },

  storage: diskStorage({
    destination: 'files/',

    // File modification details
    filename: (req: any, file: any, cb: any) => {
      cb(null, `${v4()}${extname(file.originalname)}`);
    },
  }),
};

@Module({
  imports: [
    MulterModule.register(multerOptions),
    TypeOrmModule.forFeature([User, Media])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
