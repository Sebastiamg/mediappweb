import axios from 'axios'
import { User } from '../interfaces';

const BASE_URL = 'http://localhost:3000/api/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
})

const loginPrefix = 'auth/login';
const registerPrefix = 'auth/register';

async function LogIn(credentials: Pick<User, 'email' | 'password'>) {
  const res = await apiClient.post(loginPrefix, credentials)
  return res.data
}

async function SingIn(credentials: User) {
  const res = await apiClient.post(registerPrefix, credentials)
  return res.data;
}

async function getUsers() {
  const res = await axios.get('http://localhost:3000/api/v1/users')
  return res.data
}


export { LogIn, getUsers, SingIn }
