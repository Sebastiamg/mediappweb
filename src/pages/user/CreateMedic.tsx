import { useEffect, useState } from "react"
import { plainMedicData } from "../../common/constants";
import { createMedic, getMedics } from "../../services/auth.service";
import { transformUserAuthData } from "../../common/storage";
import { Medic } from "../../interfaces";
import MedicList from "../../components/MedicList";

export default function CreateMedic() {

  const [medicInfo, setMedicInfo] = useState(plainMedicData);
  const [medics, setMedics] = useState<Medic[]>();


  useEffect(() => {
    getPushMedics();
  }, [])

  function getPushMedics() {
    getMedics().then(res => {
      const MEDICS_LIST: Medic[] = [];
      (res.data as Medic[]).forEach(medic => {
        MEDICS_LIST.push(medic);
      });

      return setMedics(MEDICS_LIST);
    })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMedicInfo(defaulrData => ({
      ...defaulrData,
      [e.target.name]: e.target.value
    }))
  }

  function createNewMedic() {
    const medicData = transformUserAuthData(medicInfo, true)[1];
    console.log(medicData)
    createMedic(medicData as Medic).then(res => {
      console.log(res)
      setMedicInfo(plainMedicData)
      getPushMedics()
      return
    }).catch((err) => {
      console.log(err.response.data);
      alert(err.response.data.message)
      return
    })
  }

  return (
    <section className="flex w-screen p-0 m-0">
      <div className="w-2/3 max-w-md mx-10 mt-10 bg-white shadow-lg shadow-gray-400 rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
          Create new medic
        </div>
        <section className="py-4 px-6" >
          <div className="flex justify-between w-full">
            <div className="mb-4 w-5/12">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstname" type="text" placeholder="Michael"
                name="firstname"
                value={medicInfo.firstname}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-4 w-5/12">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastname" type="text" placeholder="Ortiz"
                name="lastname"
                value={medicInfo.lastname}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>


          <div className="flex justify-between w-full">
            <div className="mb-4 w-5/12">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
                Identification Card
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="idCard" type="number" min={1} placeholder="1754253142"
                name="idCard"
                value={medicInfo.idCard}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-4 w-5/12">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
                Phone
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone" type="number" min={1} placeholder="0968110179"
                name="phone"
                value={medicInfo.phone}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
              Speciality
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="speciality" type="text" placeholder="Dentist"
              name="speciality"
              value={medicInfo.speciality}
              onChange={(e) => handleChange(e)}
            />
          </div>


          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="hour">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email" type="text" placeholder="sebas@gmail.com"
              name="email"
              value={medicInfo.email}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="hour">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password" type="text" placeholder="***********"
              name="password"
              value={medicInfo.password}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex items-center justify-evenly mb-4">
            <button
              className="text-slate-300 bg-red-700 hover:bg-red-600 w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={createNewMedic}
            >
              Generate Appointment
            </button>
          </div>
        </section>
      </div>
      <div className="mx-10 mt-10 w-2/3">
        {
          medics ?
            (
              <MedicList
                medics={medics}
              />
            ) :
            (
              <h1>No Medics</h1>
            )
        }
      </div>
    </section>
  )
}
