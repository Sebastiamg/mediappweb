import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="flex w-1/2 justify-between mx-auto">
      <NavLink to={'/'}>Home</NavLink>
      <NavLink to={'/auth/login'}>Login</NavLink>
      <NavLink to={'/auth/register'}>Register</NavLink>
    </nav>
  )
}
