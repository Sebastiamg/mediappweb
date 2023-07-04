/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { Medic, User } from "../interfaces";
import { AppointmentInterface } from "../interfaces/appointment.interface";
import { Appointment } from "../interfaces/user.interface";

const BASE_URL = "http://localhost:3000/api/v1";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

const loginPrefix = "auth/login";
const registerPrefix = "auth/register";
const userPrefix = "/user";
const medicPrefix = userPrefix.concat("/medic/");
const appointmentPrefix = "appointment";

// AUTH
async function LogIn(credentials: Pick<User, "email" | "password">) {
  const res = apiClient.post(loginPrefix, credentials);
  return res;
}

async function SingIn(credentials: User) {
  const res = apiClient.post(registerPrefix, credentials);
  return res;
}

// USER
async function editProfile(id: string, user: User, role?: string) {
  let res;
  if (role === "medic") {
    console.log(id);
    res = await apiClient.patch(medicPrefix.concat(`patch/${id}`), user);
  } else {
    res = await apiClient.patch(userPrefix.concat(`/${id}`), user);
  }
  return res;
}

async function getUsers() {
  const res = await axios.get("http://localhost:3000/api/v1/users");
  return res.data;
}

async function getUser(userId: string) {
  const res = await apiClient(userPrefix.concat(`/${userId}`));

  return res.data.appointment;
}

// MEDIC
async function getMedics() {
  const res = await apiClient.get(medicPrefix.concat("get"));
  return res;
}

async function createMedic(medicData: Medic) {
  const res = await apiClient.post(medicPrefix.concat("post"), medicData);
  return res;
}

async function removeMedic(id: string) {
  const res = await apiClient.delete(medicPrefix.concat(`delete/${id}`));
  return res;
}

async function getMedic(params: string) {
  const res = await apiClient.get(medicPrefix.concat(`get/${params}`));

  return res.data;
}

// APOINTMENT
async function generateAppointment(appointmentData: AppointmentInterface) {
  const res = apiClient.post<AppointmentInterface>(
    appointmentPrefix,
    appointmentData
  );
  return res;
}

async function removeAppointment(id: number) {
  const res = await apiClient.delete(appointmentPrefix.concat(`/${id}`));
  return res;
}

async function updateAppointment(id: number, payload: Partial<Appointment>) {
  const res = await apiClient.patch(
    appointmentPrefix.concat(`/${id}`),
    payload
  );

  return res;
}

export {
  LogIn,
  SingIn,
  getUsers,
  getUser,
  editProfile,
  getMedics,
  getMedic,
  createMedic,
  removeMedic,
  generateAppointment,
  updateAppointment,
  removeAppointment,
};
