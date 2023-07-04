import { useEffect, useState } from "react";
import { getMedic, getUser } from "../services/auth.service";
import { getStorageData, getStoragePlainData } from "../common/storage";
import { AppointmenData } from "../interfaces/appointment.interface";
import FilterAppointmentList from "./FilterAppointmentList";
import { defaultUserAuthData } from "../common/constants";
import { AuthUserData } from "../interfaces";

export default function AppointmentList() {
  const [userAppointmentList, setUserAppointmenList] = useState<AppointmenData>(
    []
  );

  const [data, setData] = useState<AuthUserData>(defaultUserAuthData);

  useEffect(() => {
    getAppointments();
  }, []);

  useEffect(() => {
    const data = getStorageData();
    setData(data);
  }, []);

  function getAppointments() {
    const userId = getStoragePlainData().id;
    if (data.user.role?.name === "pacient") {
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
    } else {
      getMedic(userId)
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
  }

  return (
    <section className="w-full flex justify-evenly">
      <FilterAppointmentList
        appointmentList={userAppointmentList}
        filterOption="pending"
      />

      <FilterAppointmentList
        appointmentList={userAppointmentList}
        filterOption="attended"
      />

      <FilterAppointmentList
        appointmentList={userAppointmentList}
        filterOption="lost"
      />
    </section>
  );
}
