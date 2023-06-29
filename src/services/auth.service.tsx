import axios from 'axios'
import { User } from '../interfaces';
import { AppointmentInterface } from '../interfaces/appointment.interface';

const BASE_URL = 'http://localhost:3000/api/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
})

const loginPrefix = 'auth/login';
const registerPrefix = 'auth/register';
const userPrefix = '/user'
const medicPrefix = userPrefix.concat('/medic/')
const appointmentPrefix = 'appointment'

async function LogIn(credentials: Pick<User, 'email' | 'password'>) {
  const res = apiClient.post(loginPrefix, credentials)
  return res
}

async function SingIn(credentials: User) {
  const res = apiClient.post(registerPrefix, credentials)
  return res;
}

async function editProfile(id: string, user: User) {
  const res = await apiClient.patch(userPrefix.concat(`/${id}`), user)
  return res
}

async function getUsers() {
  const res = await axios.get('http://localhost:3000/api/v1/users')
  return res.data
}

async function getMedics() {
  const res = await apiClient.get(medicPrefix.concat('get'));
  return res
}

async function generateAppointment(appointmentData: AppointmentInterface) {
  const res = apiClient.post<AppointmentInterface>(appointmentPrefix, appointmentData)
  return res
}


export { LogIn, getUsers, SingIn, editProfile, getMedics, generateAppointment }
