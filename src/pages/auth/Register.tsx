import { useState } from "react";
import { SingIn } from "../../services/auth.service";

export default function Register() {
  const [firstName, setFirstName] = useState<string>('')
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleChange(setSate: any, e: React.ChangeEvent<HTMLInputElement>) {
    setSate(e.target.value)
  }

  async function register(e: React.FormEvent) {
    e.preventDefault()
    console.log(firstName, email, password)
    const res = await SingIn({ firstName, email, password })
    console.log(res)
    return res
  }


  return (
    <>
      <form onSubmit={(e) => register(e)}>
        <div>
          <label htmlFor="firstName">Name: </label>
          <input type="text" name="firstName" onChange={(e) => handleChange(setFirstName, e)} value={firstName} />
        </div>
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
