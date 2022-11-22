import { useMemo } from 'react'
import { Calendar } from 'react-feather'
import { Button } from '../components/atoms'
import { useAuth } from '../hooks/auth'
import { usePrecipitation } from '../hooks/weather'

const HomeModule: React.FC = () => {
  const { isLoading, user } = useAuth()
  const { data } = usePrecipitation()

  const [yesterdayPrecipitation, todayPrecipitation, tomorrowPrecipitation] = useMemo(() => {
    if (!data) return [null, null, null]

    const now = new Date()
    const monthPrecipitation = data[now.getMonth()]

    // TODO: not valid. `now.getDate() - 1` can result to 0th of November
    return [
      monthPrecipitation[now.getDate() - 1],
      monthPrecipitation[now.getDate()],
      monthPrecipitation[now.getDate() + 1]
    ]
  }, [data])

  return (
    <div>
      {isLoading ? (
        <h1 className="text-3xl">Loading</h1>
      ) : (
        <div className="container lg:px-10 flex flex-col w-full mx-auto relative">
          <div className="absolute bg-gradient-to-br from-lighterpink/80 to-lightpink rounded-lg py-2 px-4 -top-4 flex space-x-4 font-medium">
            <Calendar />
            <span>17th November</span>
          </div>

          <div className="flex justify-center w-full">
            <h1 className="text-5xl pb-10 font-bold">Today</h1>
          </div>

          <div className="flex w-full space-x-20">
            <div className="w-1/3">
              <h1 className="text-2xl text-center pb-8 text-blue-800">Yesterday</h1>
              <div className="card card-compact bg-base-100 shadow-xl">
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
                      onClick={() => undefined}
                      label="Sign in!"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card card-compact w-1/3 bg-base-100 shadow-xl">
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
                    onClick={() => undefined}
                    label="Sign in!"
                  />
                </div>
              </div>
            </div>

            <div className="w-1/3">
              <h1 className="text-2xl text-center pb-8 text-blue-800">Tomorrow</h1>
              <div className="card card-compact bg-base-100 shadow-xl">
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
                      onClick={() => undefined}
                      label="Sign in!"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export { HomeModule }
