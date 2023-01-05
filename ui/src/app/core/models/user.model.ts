import { BaseModel } from './base-model.interface';

export interface UserModel extends BaseModel {
  first_name: string;
  last_name: string;
  email: string;
  media: any[];
}
