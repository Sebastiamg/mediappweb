import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/Layout";

import { ErrorPage, Login, Home, Register } from "../pages/";
import Profile from "../pages/user/Profile";
import Appointment from "../pages/Appointment";

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/user',
        children: [
          {
            path: '/user/profile',
            element: <Profile />
          }
        ]
      },

      // appointment
      {
        path: '/appointment',
        element: <Appointment />
      },
      // Auth routes
      {
        path: '/auth',
        children: [
          {
            index: true,
            path: '/auth/login',
            element: <Login />,
          },
          {
            path: '/auth/register',
            element: <Register />,
          }
        ]

      },
    ],
  },
],)
