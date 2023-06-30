import { Medic, User } from "../interfaces";
import { AuthUserData } from "../interfaces/context.interface";
import { plainMedicData, plainUserAuthData } from "./constants";

const defaultUserData: User = {
  firstname: "",
  email: "",
  password: "",
  id: "",
  profile: {

  },
  role: {
    name: 'pacient'
  }
}


export function setStorage(user: User): AuthUserData {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('isAuthenticated', JSON.stringify(true));

  return {
    user: user,
    isAuthenticated: true
  }
}

export function removeStorage(): AuthUserData {
  localStorage.removeItem('user');
  localStorage.setItem('isAuthenticated', JSON.stringify(false));

  return {
    user: defaultUserData,
    isAuthenticated: false
  }
}

export function getStorageData(): AuthUserData {
  const user = localStorage.getItem('user');
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return {
    user: user && JSON.parse(user),
    isAuthenticated: isAuthenticated && JSON.parse(isAuthenticated)
  }
}

export function getStoragePlainData(): typeof plainUserAuthData {
  const data = getStorageData().user;

  return {
    id: data.id as string,
    email: data.email,
    firstname: data.firstname,
    idCard: data.profile?.idCard as number,
    lastname: data.profile?.lastname as string,
    password: data.password,
    phone: data.profile?.phone as number,
    role: data.role?.name as string
  }
}

export function transformUserAuthData(userData: typeof plainUserAuthData, isMedic = false): [User, Omit<User, 'id'>] {
  const { email, firstname, id, idCard, lastname, password, phone, role } = userData;

  const DATA: User = {
    firstname,
    email,
    password,
    profile: {
      idCard: Number(idCard),
      lastname,
      phone: Number(phone)
    },
    role: {
      name: role
    }
  }

  if (isMedic) (DATA as Medic).speciality = (userData as typeof plainMedicData).speciality;

  return [
    {
      ...DATA,
      id,
    },
    {
      ...DATA
    }
  ]
}
