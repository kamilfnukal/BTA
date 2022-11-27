import { GetStaticProps, NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Button } from '../components/atoms'

const LandingPage: NextPage = () => {
  const { data } = useSession()
  const router = useRouter()

  // TODO: Remove this useEffect. Instead show different buttons like "Go to app" if user is logged in
  useEffect(() => {
    if (data && data.user) router.replace('/auth/home')
  }, [data])

  // TODO: Use useEffect for revalidating the page once a day (same as in src/pages/auth/home), but with
  // different query parameter "?page=index"

  return (
    <div className="">
      <div className="hero min-h-screen bg-gradient-to-tl from-lighterblue/10 to-lighterblue">
        <div className="hero-content flex-col lg:flex-row-reverse w-full lg:gap-x-20">
          <div className="flex flex-col space-y-10">
            {/* TODO: Extract to component HeroCard /molecules */}
            <div className="card card-compact max-w-[384px] bg-base-100 shadow-xl">
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
                    label="Sign in!"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-xl">
            <h1 className="text-6xl font-bold">Brno Bike Advisor</h1>
            <p className="bg-lighterblue/10 shadow-md rounded-lg py-2 px-4 my-4 text-blue-800/80">
              We will tell you, when it's safe to ride a bike in Brno. Sign in and see, when and where will be the next
              bike accident. We know the future!
            </p>

            <h2 className="text-3xl pb-4 pt-4 font-semibold text-blue-800 mt-10">Accidents</h2>
            {/* TODO: Extract to component HeroStats /molecules */}
            <div className="stats stats-vertical lg:stats-horizontal shadow">
              {/* TODO: Extract to component Stat /atoms */}
              <div className="stat">
                <div className="stat-title">This month</div>
                <div className="stat-value">15</div>
                <div className="stat-desc">↗︎ 1</div>
              </div>

              <div className="stat">
                <div className="stat-title">This year</div>
                <div className="stat-value">210</div>
                <div className="stat-desc">↗︎ 12 (22%)</div>
              </div>

              <div className="stat">
                <div className="stat-title">All time</div>
                <div className="stat-value">1,312</div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
              </div>
            </div>

            <div className="pt-8">
              <Button
                extraClasses="bg-blue-800 border-none hover:bg-lighterblue hover:text-blue-800"
                onClick={() => signIn('google')}
                label="Explore bike accidents and more!"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// TODO: Fetch data about accidents and filter it
//  - accidents this month
//  - accidents this year
//  - accidents all time
// and return count for each (because we just display counts)
// (You can reuse the logic from src/pages/auth/home)
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
}

export default LandingPage
