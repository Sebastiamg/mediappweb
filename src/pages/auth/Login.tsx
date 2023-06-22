import { useReducer, useState } from 'react'
import { LogIn } from '../../services/auth.service'

interface loginState {
  email: string,
  password: string,
  active: boolean
}

const initialState: loginState = {
  email: 'a',
  password: 'a',
  active: false
}

type loginPayload = {
  email: string,
  password: string,

}

type loginAction =
  | { type: 'login', payload: loginPayload }
  | { type: 'logout' }


// const loginReducer = (baseState: loginState, action: loginAction): loginState => {
//   switch (action.type) {
//     case 'login':
//       return Login()
//       break;

//     default:
//       break;
//   }
// }

export default function LoginPage() {
  // const [state, dispatch] = useReducer(loginReducer, initialState);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleChange(setSate: React.Dispatch<React.SetStateAction<string>>, e: React.ChangeEvent<HTMLInputElement>) {
    setSate(e.target.value)
  }


  async function validateCredentials(e: React.FormEvent) {
    e.preventDefault()
    console.log({ email, password })
    const res = await LogIn({ email, password })
    console.log(res)
    return res
  }

  return (
    <>
      <form onSubmit={validateCredentials}>
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" onChange={(e) => handleChange(setEmail, e)} value={email} />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" onChange={(e) => handleChange(setPassword, e)} value={password} />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </>
  )
}
