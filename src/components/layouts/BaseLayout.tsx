import { PropsWithChildren } from 'react'
import Image from 'next/image'
import LOGO from '../../../public/BBT_logo-b.png'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-lighterblue/20 to-lighterblue">
      <nav className="bg-lighterblue flex w-full items-center mb-10">
        <Image src={LOGO} alt="" className="mx-10 py-4" />
        <ul className="flex items-center space-x-10 container mx-auto px-10 grow">
          {/* Selected link */}
          <li className="text-blue-900 text-xl font-semibold border-b-4 border-b-blue-900 h-full flex items-center py-4">
            <Link href="/auth/home">Home</Link>
          </li>
          <li>
            <Link href="/auth/accidents/history">Accidents</Link>
          </li>
          <li className="bg-lightblue rounded px-4 py-2">
            <Link href="/auth/accidents/report">Report accident</Link>
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
