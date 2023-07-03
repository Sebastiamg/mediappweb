import { useEffect, useState } from "react"
import { getUser } from "../services/auth.service";
import { getStoragePlainData } from "../common/storage";
import { AppointmenData } from "../interfaces/appointment.interface";
import FilterAppointmentList from "./FilterAppointmentList";


export default function AppointmentList() {
  const [userAppointmentList, setUserAppointmenList] = useState<AppointmenData>([]);


  useEffect(() => {
    getAppointments()
  }, [])

  function getAppointments() {
    const userId = getStoragePlainData().id;
    getUser(userId).then(res => {
      const appointments: AppointmenData = [];
      (res as AppointmenData).forEach(appointment => {
        appointments.push(appointment)
      })

      setUserAppointmenList(appointments)
    }).catch(err => {
      console.log(err.response.data)
    });
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
  )
}
