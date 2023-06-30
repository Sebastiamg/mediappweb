import { useEffect, useState } from "react"
import { getStoragePlainData, setStorage, transformUserAuthData } from "../../common/storage";
import { plainUserAuthData } from "../../common/constants";
import { editProfile } from "../../services/auth.service";

export default function Profile() {
  const [disabledInput, setDisabledInput] = useState(true)

  const [{ email, firstname, id, idCard, lastname, phone, password, role }, setUserAuthInfo] = useState(plainUserAuthData)

  useEffect(() => {
    setUserAuthInfo(getStoragePlainData())
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserAuthInfo(userValues => ({
      ...userValues,
      [e.target.name]: e.target.value
    }))

  }


  function saveOrDiscardChanges() {
    setDisabledInput(true)
    const user = transformUserAuthData({ email, id, firstname, idCard, lastname, phone, password, role })

    editProfile(id as string, user[1], role).then(res => {
      console.log(res.data)
      setStorage(user[0])
      window.location.reload()
    }).catch(err => {
      console.log(err.response.data)
      alert(err.response.data.message)
    })
    return true
  }


  return (
    <>
      <div className="max-w-md mx-auto mt-10 bg-white shadow-lg shadow-gray-400 rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
          Profile
        </div>
        <section className="py-4 px-6" >
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="firstname">
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstname" type="text" placeholder="Michael"
              name="firstname"
              value={firstname}
              onChange={(e) => handleChange(e)}
              disabled={disabledInput}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="lastname">
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastname" type="text" placeholder="Ortiz"
              name="lastname"
              value={lastname || ''}
              onChange={(e) => handleChange(e)}
              disabled={disabledInput} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email" type="email" placeholder="sebas@gmail.com"
              name="email"
              value={email}
              onChange={(e) => handleChange(e)}
              disabled={disabledInput} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="idCard">
              Identification Card
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="idCard" type="number" placeholder="1754253242"
              name="idCard"
              value={idCard || ''}
              onChange={(e) => handleChange(e)}
              disabled={disabledInput} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone" type="number" placeholder="0968110179"
              name="phone"
              value={phone || ''}
              onChange={(e) => handleChange(e)}
              disabled={disabledInput} />
          </div>

          <div className="flex items-center justify-evenly mb-4">
            <button
              className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              onClick={() => setDisabledInput(false)}
            >
              Edit Profile
            </button>
            {
              !disabledInput && (
                <button
                  className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                  onClick={saveOrDiscardChanges}
                >
                  Save
                </button>)
            }
          </div>

        </section>
      </div>
    </>
  )
}
