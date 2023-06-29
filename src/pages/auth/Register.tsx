import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { regex } from "../../common/constants";
import { SingIn } from "../../services/auth.service";
import { removeStorage, setStorage } from "../../common/storage";
import { User } from "../../interfaces";

import logo from '../../assets/medic-logo.png'


export default function Register() {
  const [firstname, setFirstname] = useState<string>('')
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confPassword, setConfPassword] = useState<string>('')

  const [validData, setValidData] = useState({ firstname: false, email: false, password: false })

  useEffect(() => {
    checkPassword()
  }, [password, confPassword])

  useEffect(() => {
    removeStorage()
  }, [])



  const firstnameRef = useRef<HTMLInputElement>(null)

  function handleChange({ value, name, parentNode }: EventTarget & HTMLInputElement, SetChange: React.Dispatch<React.SetStateAction<string>>) {
    // set changes
    SetChange(value)

    if (name === 'password' || name === 'confPassword') return checkPassword();
    const checkInputValue: boolean = checkInputData(name, value, parentNode)

    referenceInputColors([name], checkInputValue)
  }

  function checkInputData(inputName: string, value: string, parentNode: ParentNode | null) {
    const checkIcon = parentNode?.lastChild?.lastChild as HTMLElement;
    const errorIcon = parentNode?.lastChild?.firstChild as HTMLElement;

    let isValidData = false;

    if (!regex[inputName].test(value)) {
      isValidData = false;
    } else {
      isValidData = true;
    }

    errorIcon.classList.remove(!isValidData ? 'hidden' : 'other');
    errorIcon.classList.add(isValidData ? 'hidden' : 'other');

    checkIcon.classList.remove(isValidData ? 'hidden' : 'other')
    checkIcon.classList.add(!isValidData ? 'hidden' : 'other')

    setValidData(currentVal => ({ ...currentVal, [inputName]: isValidData }))
    return isValidData
  }

  function checkPassword() {
    let identicalPassword: boolean;

    if (password.length <= 0) return

    if (password !== confPassword) {
      identicalPassword = false

    } else {
      identicalPassword = true
    }

    setValidData(currentVal => ({ ...currentVal, password: identicalPassword }))
    return referenceInputColors(['password', 'confPassword'], identicalPassword)
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


  async function Register(e: React.FormEvent) {
    e.preventDefault()

    await SingIn({
      firstname,
      email,
      password
    }).then((res) => {
      console.log(res.data)
      const { id, email, firstname, password, profile, role } = res.data as User;
      setStorage({ id, email, firstname, password, profile, role });
      console.log(res.data);

      window.location.href = '/';

      return res.data;

    }).catch((err) => {
      console.error(err);

      const { details, error, message } = err.response.data;
      alert(`${message}\n${error}\n${details}`);

      return error.response.data;
    })

  }


  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-10 w-auto" src={logo} alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Register
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-md shadow-slate-400 sm:rounded-lg sm:px-10">
            <form>

              {/* fitst name */}
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium leading-5  text-grayn700">First Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input ref={firstnameRef} id="firstname" name="firstname" placeholder="Michael" type="text" value={firstname} onChange={(e) => handleChange(e.target, setFirstname)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue  transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    {/* Error Icon */}
                    <svg id="firstnameError" className="hidden h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 512 512">
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" /></svg>

                    {/* Check Icon */}
                    <svg id="firstnameCheck" className="hidden h-5 w-5 text-lime-600" fill="currentColor" viewBox="0 0 512 512">
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

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

              {/* confirm password */}
              <div className="mt-6">
                <label htmlFor="confPassword" className="block text-sm font-medium leading-5 text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input id="confPassword" name="confPassword" value={confPassword} onChange={(e) => handleChange(e.target, setConfPassword)} type="password" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue  transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button onClick={Register} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out" disabled={Object.values(validData).some((data) => data === false)}>
                    Register
                  </button>
                </span>
              </div>

              <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
                Or {""}
                <Link to={'/auth/login'}
                  className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                  login to your account
                </Link >
              </p>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}
