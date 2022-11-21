import { Button } from '../components/atoms'
import { useAuth } from '../hooks/auth'

const HomeModule: React.FC = () => {
  const { isLoading, user } = useAuth()

  return (
    <div>
      {isLoading ? (
        <h1 className="text-3xl">Loading</h1>
      ) : (
        <div className="container px-10 flex flex-col w-full mx-auto">
          <div className="flex justify-around pt-10 pb-5 items-baseline">
            <h1 className="text-xl">Yesterday</h1>
            <h1 className="text-5xl font-bold">Today</h1>
            <h1 className="text-xl">Tomorrow</h1>
          </div>
          <div className="flex w-full space-x-20">
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

            <div className="card card-compact w-1/3 bg-base-100 shadow-xl">
              <figure>
                <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Thursday, 17th November</h2>
                <p>Today it is completely safe to ride a bike. No accident will happen! 🔥</p>
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
      )}
    </div>
  )
}

export { HomeModule }
