import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/Layout";

import {
  ErrorPage,
  Login,
  Home,
  Register,
  Profile,
  Appointment,
  CreateMedic,
} from "../pages/";
import GestionAppointment from "../pages/appointment/gestionAppointment";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/user",
        children: [
          {
            path: "/user/profile",
            element: <Profile />,
          },
        ],
      },

      // appointment
      {
        path: "/appointment",
        element: <Appointment />,
      },
      // gestion appointment
      {
        path: "/appointment/gestion",
        element: <GestionAppointment />,
      },
      // Auth routes
      {
        path: "/medic/create",
        element: <CreateMedic />,
      },
      {
        path: "/auth",
        children: [
          {
            index: true,
            path: "/auth/login",
            element: <Login />,
          },
          {
            path: "/auth/register",
            element: <Register />,
          },
        ],
      },
    ],
  },
]);
