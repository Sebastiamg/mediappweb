import { useEffect, useRef, useState } from "react";
import {
  generateAppointment,
  getMedics,
  getUser,
  removeAppointment,
} from "../../services/auth.service";
import { User } from "../../interfaces";
import { AppointmentInterface } from "../../interfaces/appointment.interface";
import { getStoragePlainData } from "../../common/storage";

export default function Appointment() {
  const [date, setDate] = useState<string>("");
  const [hour, setHour] = useState<string>("");
  const [medic, setMedic] = useState<string>("");

  const [medics, setMedics] = useState<{ name: string; id: string }[]>([]);

  type AppointmenData = Omit<AppointmentInterface, "user" | "medic">[];
  const [userAppointmentList, setUserAppointmenList] = useState<AppointmenData>(
    []
  );

  const sendBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    getMedics().then((res) => {
      const medicNames: { name: string; id: string }[] = [];
      (res.data as User[]).forEach((medic) => {
        medicNames.push({ name: medic.firstname, id: medic.id as string });
      });
      setMedics(medicNames);
    });
  }, []);

  useEffect(() => {
    const btn = sendBtnRef.current as HTMLButtonElement;
    if ((date.length && hour.length && medic.length) <= 1) {
      btn.disabled = true;
      btn.classList.remove("bg-gray-900", "hover:bg-gray-800");
      btn.classList.add("bg-gray-500");
      return;
    }
    btn.disabled = false;
    btn.classList.remove("bg-gray-500");
    btn.classList.add("bg-gray-900", "hover:bg-gray-800");
    return;
  }, [date, hour, medic]);

  // appointment list
  useEffect(() => {
    getUserAppointmentData();
  }, []);

  function getUserAppointmentData() {
    const userId = getStoragePlainData().id;
    getUser(userId)
      .then((res) => {
        const appointments: AppointmenData = [];
        (res as AppointmenData).forEach((appointment) => {
          appointments.push(appointment);
        });

        setUserAppointmenList(appointments);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  function deleteAppointment(id: number) {
    console.log(id);
    removeAppointment(id)
      .then((res) => {
        console.log(res);
        getUserAppointmentData();
      })
      .catch((err) => {
        console.log(err.reponse.data);
        alert(err.reponse.data.message);
      });
  }

  function createAppointment() {
    const userId = getStoragePlainData().id;

    const appoitment: AppointmentInterface = {
      hour,
      date,
      medic,
      user: userId,
      status: getAppointmentStatus(date),
    };
    console.log(appoitment);
    if ((date.length && hour.length && medic.length) <= 1) return;
    generateAppointment(appoitment)
      .then((res) => {
        console.log(res.data);
        getUserAppointmentData();
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data.message);
      });
  }

  function getAppointmentStatus(date: string): string {
    if (new Date(date) < new Date()) {
      return "lost";
    }
    return "pending";
  }

  return (
    <div className="flex justify-evenly">
      <div className="w-2/5 max-w-md mx-10 mt-10 bg-white shadow-lg shadow-gray-400 rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
          Medic Appointment
        </div>
        <section className="py-4 px-6">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              placeholder="Michael"
              name="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="hour"
            >
              Hour
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="hour"
              type="time"
              placeholder="Ortiz"
              name="hour"
              onChange={(e) => setHour(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="medic"
            >
              Medic
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="medic"
              name="medic"
              onChange={(e) => setMedic(e.target.value)}
            >
              <option value="">Select a Medic</option>
              {medics.map((med) => (
                <option key={med.id} value={med.id}>
                  {med.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-evenly mb-4">
            <button
              className="text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={createAppointment}
              ref={sendBtnRef}
            >
              Generate Appointment
            </button>
          </div>
        </section>
      </div>
      <div className="w-4/5 max-w-md mx-10 mt-10 bg-white shadow-lg shadow-gray-400 rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
          Appointmen List
        </div>
        <ul className="py-4 px-6 h-96 overflow-auto">
          {userAppointmentList.map((appointmentData, idx) => (
            <li
              key={idx}
              className="w-full flex justify-between bg-gray-200 shadow-gray-400 rounded-lg mb-3"
            >
              <section className="w-4/5 p-2">
                <h1>
                  <span className="font-bold">Hour: </span>
                  {appointmentData.hour}
                </h1>
                <h1>
                  <span className="font-bold">Date: </span>
                  {new Date(appointmentData.date).toDateString()}
                </h1>
                <h1>
                  <span className="font-bold">Status: </span>
                  {appointmentData.status}
                </h1>
              </section>
              <section className="w-1/12 flex justify-end bg-red-900 rounded-r-md">
                <button
                  className="h-full w-full"
                  onClick={() => deleteAppointment(Number(appointmentData.id))}
                ></button>
              </section>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
