import { Profile, Role, User } from ".";

export interface AuthUserData {
  isAuthenticated: boolean;
  user: User;
}
