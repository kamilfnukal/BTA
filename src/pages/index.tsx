import { GetStaticProps, NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Button } from '../components/atoms'
import { HeroCard, HeroStats } from '../components/molecules'
import { YEAR_OFFSET } from '../const'
import { getBrnoBikeAccidents } from '../hooks/accidents'

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
            <HeroCard
              header={'Thursday, 17th November'}
              firstParagraph={'Today it is completely safe to ride a bike. No accident will happen! 🔥'}
              secondParagraph={'22 °C is comfortable for bike riding. Have fun!'}
            />
          </div>

          <div className="max-w-xl">
            <h1 className="text-6xl font-bold">Brno Bike Advisor</h1>
            <p className="bg-lighterblue/10 shadow-md rounded-lg py-2 px-4 my-4 text-blue-800/80">
              We will tell you, when it's safe to ride a bike in Brno. Sign in and see, when and where will be the next
              bike accident. We know the future!
            </p>

            <h2 className="text-3xl pb-4 pt-4 font-semibold text-blue-800 mt-10">Accidents</h2>
            <HeroStats
              thisMonth={{
                title: 'This month',
                value: '15',
                desc: '↗︎ 1'
              }}
              thisYear={{
                title: 'This year',
                value: '210',
                desc: '↗︎ 12 (22%)'
              }}
              allTime={{
                title: 'All time',
                value: '1,312',
                desc: '↘︎ 90 (14%)'
              }}
            />

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

//Fetch data about accidents and filter it
//  - accidents this month
//  - accidents this year
//  - accidents all time
// and return count for each (because we just display counts)
// (You can reuse the logic from src/pages/auth/home)
export const getStaticProps: GetStaticProps = async () => {
  const now = new Date()
  const year = now.getFullYear() - YEAR_OFFSET
  const month = now.getMonth()

  const accidents = await getBrnoBikeAccidents();

  return {props:{
    accidentsThisMonth: accidents.filter(({ attributes: { mesic } }) => mesic == month),
    accidentsThisYear: accidents.filter(({ attributes: { rok } }) => rok == year),
    accidentsAllTime: accidents
  }};
}

export default LandingPage
