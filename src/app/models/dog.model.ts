import { UserModel } from './user.model';

export class DogModel {
  id: string;
  name: string;
  owner: UserModel;
}
