import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { getStorageData } from "../common/storage";
import { AuthUserData } from "../interfaces/context.interface";
import Footer from "../components/Footer";

export default function Layout() {

  const [data, setData] = useState<AuthUserData>()

  useEffect(() => {
    const data = getStorageData();
    setData(data)
  }, [])

  return (
    <div>
      {!window.location.toString().includes('login' || 'register') ? <NavBar /> : null}
      <main>
        <Outlet />
      </main>
      {!window.location.toString().includes('login' || 'register') ? <Footer /> : null}
    </div>
  )
}
