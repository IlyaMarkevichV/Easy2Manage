import {Role} from './role';

export class User {
  id: string;
  username: string;
  password: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: Date;
  imagePath: string;
}
