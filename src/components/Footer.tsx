import { Link } from 'react-router-dom';
import Logo from '../assets/medic-logo.png';

export default function Footer() {
  return (
    <>
      <footer className="mt-16 px-3 pt-4 lg:px-9 border-t-2 bg-gray-900">
        <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">

          <div className="sm:col-span-2">
            <Link to="/" className="inline-flex items-center">
              <img src={Logo} alt="logo" className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold tracking-wide text-white">Medi App</span>
            </Link>
            <div className="mt-6 lg:max-w-xl">
              <p className="text-sm text-slate-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi felis mi, faucibus dignissim lorem
                id, imperdiet interdum mauris. Vestibulum ultrices sed libero non porta. Vivamus malesuada urna eu
                nibh malesuada, non finibus massa laoreet. Nunc nisi velit, feugiat a semper quis, pulvinar id
                libero. Vivamus mi diam, consectetur non orci ut, tincidunt pretium justo. In vehicula porta
                molestie. Suspendisse potenti.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <p className="text-base font-bold tracking-wide text-white">Dev Team</p>
            <a href="#" className="text-slate-400">Michael Ortiz</a>
            <a href="#" className="text-slate-400">David Castro</a>
            <a href="#" className="text-slate-400">Tatiana Demera</a>
            <p className="text-base font-bold tracking-wide text-white">Technologies used</p>
            <a href="#" className="text-slate-400">Vite - React - TypeScript</a>
            <a href="#" className="text-slate-400">NestJS - Docker</a>
            <a href="#" className="text-slate-400">React Navite</a>
          </div>

          <div>
            <p className="text-base font-bold tracking-wide text-white">MEDI APP IS ALSO AVAILABLE ON</p>
            <div className="flex items-center mt-5">
              <a href="#" className="w-full min-w-xl">
                <img src="https://mcqmate.com/public/images/icons/playstore.svg" alt="Playstore"
                  className="h-10" />
              </a>
            </div>
            <p className="text-base font-bold tracking-wide text-gray-900">Contacts</p>
            <div className="flex">
              <p className="mr-1 text-slate-400">Email:</p>
              <a href="#" className="text-white">admin@mediapp.com</a>
            </div>
          </div>

        </div>

        <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
          <p className="text-sm text-slate-500">© Copyright 2023 Company. All rights reserved.</p>
          <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
            <li>
              <a href="#"
                className="text-sm text-slate-500 transition-colors duration-300 hover:text-deep-purple-accent-400">Privacy
                &amp; Cookies Policy
              </a>
            </li>
            <li>
              <a href="#"
                className="text-sm text-slate-500 transition-colors duration-300 hover:text-deep-purple-accent-400">Disclaimer
              </a>
            </li>
          </ul>
        </div>

      </footer>
    </>
  )
}
