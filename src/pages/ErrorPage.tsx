import { Link, useRouteError, } from "react-router-dom"

interface ErrorProperties {
  status: number,
  statusText: string,
  error: {
    message: string,
    stack: string
  },
}


export default function ErrorPage() {
  const { status, statusText } = useRouteError() as ErrorProperties
  return (
    <>
      <h2>ERROR</h2>
      <h1>{status}</h1>
      <h3>{statusText}</h3>
      <Link to={'/'} >Back to Home</Link>
    </>
  )
}


