import { PropsWithChildren } from 'react'
import Image from 'next/image'
import LOGO from '../../../public/BBT_logo-b.png'
import { signOut } from 'next-auth/react'
import { NavLink } from '../atoms/NavLink'
import Link from 'next/link'

const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-lighterblue/20 to-lighterblue">
      <nav className="bg-lighterblue flex w-full items-center mb-10">
        <Image src={LOGO} alt="" className="mx-10 py-4" />
        <ul className="flex items-center space-x-10 container mx-auto px-10 grow">
          {/* Selected link */}
          <li>
            <NavLink href="/auth/home">
              <>Home</>
            </NavLink>
          </li>
          <li>
            <NavLink href="/auth/accidents/history">
              <>Accidents</>
            </NavLink>
          </li>
          <li className="bg-lightblue rounded px-4 py-2 shadow hover:shadow-md hover:cursor-pointer">
            <NavLink href="/auth/accidents/plan-trip">
              <>Plan your next trip!</>
            </NavLink>
          </li>
        </ul>

        {/* Profile */}
        <div className="flex items-center justify-center mr-10 whitespace-nowrap space-x-4">
          {/* TODO: user's first_name letter and last_name letter */}
          <div className="h-10 w-10 rounded-full bg-lightblue flex items-center justify-center">DP</div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="text-xl cursor-pointer">
              Můj profil
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 mt-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link href="/auth/profile" className="hover:bg-lightpurple/50 focus:bg-lightpurple focus:text-black">
                  Nastavení
                </Link>
              </li>
              <li className="text-red-800">
                <button
                  onClick={() => signOut()}
                  className="hover:bg-lightpurple/50 focus:bg-lightpurple focus:text-black"
                >
                  Odhlásit se
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}

export { BaseLayout }
