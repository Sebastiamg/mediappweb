import { useEffect, useState } from "react";
import { getStorageData } from "../common/storage";
import { AuthUserData } from "../interfaces";
import { defaultUserAuthData } from "../common/constants";
import { Link } from "react-router-dom";
import AppointmentList from "../components/AppointmentList";

export default function Home() {

  const [data, setData] = useState<AuthUserData>(defaultUserAuthData)

  useEffect(() => {
    const data = getStorageData();
    setData(data)
  }, [])


  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-8/12 mb-10">
          <div className="container mx-auto h-full sm:p-10">
            <section className="flex px-4 justify-between items-center">
              <div className="text-4xl font-bold">
                <span className="text-gray-800">Medi App</span>
              </div>
            </section>
            <section className="container px-4 lg:flex mt-0 items-center h-full lg:mt-0">
              <div className="w-full">
                <h1 className="text-4xl lg:text-6xl font-bold">Create or view the list of your medical <span className="text-gray-800">appointment</span></h1>
                <div className="w-20 h-2 bg-gray-800 my-4"></div>

                {
                  data.isAuthenticated &&
                  (
                    <Link to={!data.user ? '/auth/login' : '#appointmentFilteredList'}
                      reloadDocument={true}
                      className="bg-gray-800 hover:bg-gray-700 transition-all text-white text-2xl font-medium px-4 py-2 rounded shadow">
                      {
                        !data.user ?
                          "LogIn" :
                          "See my appointments"
                      }
                    </Link>
                  )
                }
              </div>
            </section>
          </div>
        </div>
        <img src="https://cutewallpaper.org/21/team-fortress-2-medic-wallpapers/Team-Fortress-2-Wallpapers-Game-Wallpapers-Desktop-Background.jpg"
          alt="Medic Wallpaper"
          className="w-full h-48 object-cover sm:h-screen sm:w-4/12" />
      </div>

      {/* Medic appointments */}
      {
        data.isAuthenticated &&
        (
          <section id="appointmentFilteredList" className="mt-10">
            <AppointmentList />
          </section>
        )
      }

      <div className="w-full flex items-center pt-16">
        <Link to={!data.user ? '/auth/login' : '/appointment'}
          reloadDocument={true}
          className="bg-gray-800 hover:bg-gray-700 transition-all text-white text-2xl font-medium px-4 py-2 rounded shadow mx-auto">
          {
            !data.user ?
              "Create or  LogIn with your account" :
              "Create new Appointment"
          }
        </Link>
      </div>
    </>
  )
}
