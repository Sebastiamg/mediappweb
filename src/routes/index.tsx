import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/Layout";

import { ErrorPage, Login, Home, Register } from "../pages/";

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
