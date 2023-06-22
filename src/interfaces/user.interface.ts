import { Profile } from "./profile.interface";
import { Role } from "./role.interface";

export interface User {
  firstName: string;
  email: string;
  password: string;
  profile?: Profile
  role?: Role
}
