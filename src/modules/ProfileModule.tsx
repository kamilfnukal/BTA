import CITY from '../../public/city4.jpeg'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const ProfileModule: React.FC = () => {
  const { data } = useSession()
  return (
    <div className="container mx-auto">
      <div className="bg-lightblue rounded-md shadow-lg relative">
        <div className="w-full h-52 relative overflow-hidden rounded-t-md">
          <Image src={CITY} alt="" fill />
        </div>

        <div className="absolute h-40 w-40 rounded-full bg-black top-32 left-10">
          {/* Image */}
          <div></div>
        </div>

        <div className="py-8 pl-64">
          <h1 className="text-5xl font-semibold text-gray-800">{data?.user?.name}</h1>
          <p className="text-gray-500 mt-2">{data?.user?.email}</p>
        </div>
      </div>
    </div>
  )
}

export { ProfileModule }
