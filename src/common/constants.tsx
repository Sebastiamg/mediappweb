import { AuthUserData } from "../interfaces/context.interface"

export const regex: Record<string, RegExp> = {
  firstname: /^[a-zA-Z]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/
}


export const defaultUserAuthData: AuthUserData = {
  isAuthenticated: false,
  user: {
    firstname: "",
    email: "",
    password: "",
    id: "",
    profile: {
      lastname: "",
      idCard: 0,
      phone: 0,
    },
    role: {
      name: "pacient"
    }
  }
}

export const plainUserAuthData = {
  id: "",
  firstname: "",
  email: "",
  password: "",
  lastname: "",
  idCard: 0,
  phone: 0,
  role: 'pacient'
}

export const defaultMedicData = {
  ...defaultUserAuthData,
  role: {
    name: 'medic'
  },
  speciality: ''
}

export const plainMedicData = {
  ...plainUserAuthData,
  role: 'medic',
  speciality: ''
}
