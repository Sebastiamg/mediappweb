import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Layout() {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <footer>hola desde el footer</footer>
    </div>
  )
}
