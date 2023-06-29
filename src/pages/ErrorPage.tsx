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
    <main className="flex flex-col h-screen justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center">
        <h1 className="text-[120px] font-extrabold text-gray-700">{status}</h1>
        <p className="text-2xl font-medium text-gray-600 mb-6">{statusText}</p>

        <Link to="/" className="px-4 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out">
          Go Home
        </Link>
      </div>
    </main>
  )
}


