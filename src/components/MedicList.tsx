import { Medic } from "../interfaces";

import MedicLogo from '../assets/medic.jpg'
import { removeMedic } from "../services/auth.service";

interface Props {
  medics: Medic[]
}

export default function MedicList({ medics }: Props) {

  function deleteMedic(id: string) {
    console.log(id)
    removeMedic(id).then((res) => {
      console.log(res.data)
      window.location.reload()
      return
    }).catch(err => {
      console.log(err.response.data)
      alert(err.response.data.message)
    })
  }


  return (
    <section className="flex flex-wrap w-full justify-start">
      {
        medics.map(medic => (
          <div key={medic.id} className="rounded-xl overflow-hidden flex shadow-sm shadow-slate-600 hover:shadow-md max-w-sm w-2/3 m-2 bg-white cursor-pointer h-36 border-2 border-gray-900">
            <div className="w-7/12 pl-3 p-3 text-text1 flex flex-col justify-center">
              <h1 className="text-base mb-2 font-bold truncate">{medic.firstname.concat(" ", medic.profile?.lastname as string)}</h1>
              <div className="text-xs text-primary">
                <div className="flex items-center">
                  <span className="font-bold tracking-wide text-sm text-blue-700">{medic.speciality}</span>
                </div>
              </div>
              <div className="text-sm text-text2 tracking-wider">{medic.email}</div>
              <div className="text-sm text-text2 tracking-wider">{medic.profile?.idCard}</div>
              <div className="text-sm text-text2 tracking-wider">{medic.profile?.phone}</div>
            </div>
            <div className="lg:flex flex w-5/12 p-2">
              <img src={MedicLogo} className="rounded-xl object-cover w-full h-full" />
            </div>
            <div className="flex flex-col w-1/12">
              <button
                className="h-screen text-slate-300 bg-red-700 hover:bg-red-600 w-full font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                onClick={() => deleteMedic(medic.id as string)}
              >
              </button>
            </div>
          </div>
        ))
      }
    </section>
  )
}
