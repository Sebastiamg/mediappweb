import { useEffect, useState } from "react";
import { getStorageData } from "../../common/storage";
import { getMedic, updateAppointment } from "../../services/auth.service";
import { Appointment } from "../../interfaces/user.interface";

export default function GestionAppointment() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const medicId = getStorageData().user.id;
    getMedic(medicId as string)
      .then((res) => {
        setAppointments(res.appointment);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function editAppointment(
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number
  ) {
    console.log(id);
    updateAppointment(id, { status: e.target.value })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.repsonse.data);
      });
  }

  return (
    <>
      <ul className="w-2/6 mx-auto shadow-md shadow-gray-400 m-16 pb-1">
        <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
          Manage my Medical Appointments
        </div>
        {appointments &&
          appointments.map((appointment) => (
            <li
              key={appointment.date}
              className="w-11/12 flex justify-between mx-auto bg-gray-200 shadow-gray-400 rounded-lg my-5"
            >
              <section className="w-4/5 p-2">
                <h1>
                  <span className="font-bold">Hour: </span>
                  {appointment.hour}
                </h1>
                <h1>
                  <span className="font-bold">Date: </span>
                  {new Date(appointment.date).toDateString()}
                </h1>

                <select
                  name="status"
                  id="status"
                  defaultValue={appointment.status}
                  onChange={(e) => editAppointment(e, appointment.id as number)}
                >
                  <option value="attended">Attended</option>
                  <option value="pending">Pending</option>
                  <option value="lost">Lost</option>
                </select>
              </section>
            </li>
          ))}
      </ul>
    </>
  );
}
