import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";

import { LogIn } from "../../services/auth.service";
import { removeStorage, setStorage } from "../../common/storage";
import { User } from "../../interfaces";

import logo from '../../assets/medic-logo.png'


export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    removeStorage()
  }, [])


  function handleChange({ value }: EventTarget & HTMLInputElement, SetChange: React.Dispatch<React.SetStateAction<string>>) {
    // set changes
    SetChange(value)
  }





  function referenceInputColors(inputNames: string[], isCorrect: boolean) {

    inputNames.forEach(name => {
      const input = document.querySelector(`#${name}`);
      input?.classList.remove('border-green-700');
      input?.classList.remove('border-red-700');

      if (isCorrect) {
        input?.classList.add('border-green-700')
      } else if (!isCorrect) {
        input?.classList.add('border-red-700')
      }

    })
  }


  async function LoginUser(e: React.FormEvent) {
    e.preventDefault()

    await LogIn({
      email,
      password
    }).then((res) => {
      referenceInputColors(['email', 'password'], true)
      const { id, email, firstname, password, profile, role } = res.data as User
      setStorage({ id, email, firstname, password, profile, role })
      console.log(res.data)

      setTimeout(() => {
        window.location.href = '/'
        redirect('/')
      }, 500);

      return res.data

    }).catch((err) => {
      console.error(err)
      referenceInputColors(['email', 'password'], false)

      const { details, error, message } = err.response.data
      alert(`${message}\n${error}\n${details}`)

      return error.response.data
    })

  }


  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-10 w-auto" src={logo} alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-md shadow-slate-400 sm:rounded-lg sm:px-10">
            <form>
              {/* Email */}
              <div className="mt-6">
                <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input id="email" name="email" placeholder="sebas@gmial.com" type="email" value={email} onChange={(e) => handleChange(e.target, setEmail)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue  transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    {/* Error Icon */}
                    <svg id="emailError" className="hidden h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 512 512">
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" /></svg>

                    {/* Check Icon */}
                    <svg id="emailCheck" className="hidden h-5 w-5 text-lime-600" fill="currentColor" viewBox="0 0 512 512">
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* password */}
              <div className="mt-6">
                <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                  Password
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input id="password" name="password" value={password} onChange={(e) => handleChange(e.target, setPassword)} type="password" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue  transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>
              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button onClick={LoginUser} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out" >
                    Login
                  </button>
                </span>
              </div>

              <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
                Or {""}
                <Link to={'/auth/register'}
                  className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                  Create new account
                </Link >
              </p>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}
