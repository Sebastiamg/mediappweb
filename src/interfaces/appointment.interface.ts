export interface AppointmentInterface {
  date: string;
  hour: string;
  user: string;

  medic: string;
  status: string;
}

export type AppointmenData = Omit<AppointmentInterface, "user" | "medic">[];
