import { useEffect, useRef, useState } from "react"
import { generateAppointment, getMedics } from "../services/auth.service";
import { User } from "../interfaces";
import { AppointmentInterface } from "../interfaces/appointment.interface";
import { getStoragePlainData } from "../common/storage";

export default function Appointment() {
  const [date, setDate] = useState<string>('');
  const [hour, setHour] = useState<string>('');
  const [medic, setMedic] = useState<string>('');

  const [medics, setMedics] = useState<{ name: string, id: string }[]>([])



  const sendBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    getMedics().then(res => {
      const medicNames: { name: string, id: string }[] = [];
      (res.data as User[]).forEach(medic => {
        medicNames.push({ name: medic.firstname, id: medic.id as string })
      })
      setMedics(medicNames)
    })
  }, [])

  useEffect(() => {
    console.log(medic)
    // bg - gray - 900
    const btn = sendBtnRef.current as HTMLButtonElement
    if ((date.length && hour.length && medic.length) <= 1) {
      btn.disabled = true;
      btn.classList.remove('bg-gray-900', 'hover:bg-gray-800')
      btn.classList.add('bg-gray-500')
      return
    }
    btn.disabled = false;
    btn.classList.remove('bg-gray-500')
    btn.classList.add('bg-gray-900', 'hover:bg-gray-800')
    return
  }, [date, hour, medic])

  function createAppointment() {
    const userId = getStoragePlainData().id;

    const appoitment: AppointmentInterface = {
      hour,
      date,
      medic,
      user: userId,
      status: "false"
    };
    console.log(appoitment)
    if ((date.length && hour.length && medic.length) <= 1) return
    generateAppointment(appoitment).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err.response.data)
    })
  }



  return (
    <div>
      <div className="max-w-md mx-10 mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
          Medic Appointment
        </div>
        <section className="py-4 px-6" >
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
              Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date" type="date" placeholder="Michael"
              name="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="hour">
              Hour
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="hour" type="time" placeholder="Ortiz"
              name="hour"
              onChange={(e) => setHour(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="medic">
              Service
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="medic" name="medic"
              onChange={(e) => setMedic(e.target.value)}
            >
              <option value="">Select a Medic</option>
              {
                medics.map(med => (
                  <option key={med.id} value={med.id}>{med.name}</option>
                ))
              }
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
    </div>
  )
}
