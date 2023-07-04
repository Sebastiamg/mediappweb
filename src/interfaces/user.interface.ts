import { Profile } from "./profile.interface";
import { Role } from "./role.interface";

export interface Appointment {
  id?: number;
  date: string;
  hour: string;
  status: string;
}

export interface User {
  id?: string;
  firstname: string;
  email: string;
  password: string;
  profile?: Profile;
  role?: Role;
  appointment?: Appointment[];
}
