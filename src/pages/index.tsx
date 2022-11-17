import { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Button } from '../components/atoms'

const LandingPage: NextPage = () => {
  const { data } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (data && data.user) router.replace('/auth/home')
  }, [data])

  return (
    <div className="">
      <div className="hero min-h-screen bg-lighterblue/30">
        <div className="hero-content flex-col lg:flex-row-reverse w-full lg:gap-x-20">
          <div className="flex flex-col space-y-10">
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
              <figure>
                <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Thursday, 17th November</h2>
                <p>Today it is completely safe to ride a bike. No accident will happen! 🔥</p>
                <p>22 °C is comfortable for bike riding. Have fun!</p>
                <div className="card-actions justify-end mt-4 mb-2">
                  <Button
                    extraClasses="bg-blue-800 border-none hover:bg-lighterblue hover:text-blue-800"
                    onClick={() => signIn('google')}
                    label="Explore bike accidents and more!"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-xl">
            <h1 className="text-6xl font-bold">Brno Bike Transport advisor</h1>
            <p className="py-6 text-xl text-blue-800/60">
              We will tell you, when it's safe to ride a bike in Brno. We know the future!
            </p>
            <Button
              extraClasses="bg-blue-800 border-none hover:bg-lighterblue hover:text-blue-800"
              onClick={() => signIn('google')}
              label="Sign in"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
