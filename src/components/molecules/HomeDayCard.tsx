import clsx from 'clsx'
import Image from 'next/image'
import { Sun, Umbrella } from 'react-feather'

import { Button } from '../atoms'
import { WithAccidentModal } from '../organisms'

import { HomeModuleDayProps } from '../../types'
import { EXAMPLE_BRNO_BIKE_ACCIDENT_RESPONSE } from '../../const/api'

import BIKE from '../../../public/home-images/bicycle.png'
import BUS from '../../../public/home-images/bus.png'
import CAR from '../../../public/home-images/car.jpeg'

type CardProps = HomeModuleDayProps & {
  title?: string
  accidents: typeof EXAMPLE_BRNO_BIKE_ACCIDENT_RESPONSE[]
}

const getImage = (temperature: number | string, precipitaion: number | string, accidentsCount: number) => {
  if (accidentsCount > 0) return CAR
  if (temperature > 20) return BIKE
  if (precipitaion > 0) return BUS

  return BIKE
}

const Card: React.FC<CardProps> = ({ temperature, precipitation, title, accidents }) => {
  const smaller = !!title
  const hasAccidents = accidents.length !== 0
  const imageSrc = getImage(temperature, precipitation, accidents.length)

  return (
    <div className="card card-compact bg-base-100 shadow-xl rounded-t-lg">
      <div>
        <Image
          src={imageSrc}
          alt="bike"
          className={clsx('rounded-t-lg w-full object-bottom object-cover', title && 'h-40 object-bottom object-cover')}
        />
      </div>
      <div className={clsx('card-body', !hasAccidents && '!pb-10')}>
        <div className={clsx('flex justify-around', smaller ? 'text-md' : 'text-xl')}>
          <div className="flex items-center space-x-4 mt-2 mb-4">
            <div>
              <Sun size={smaller ? 20 : 28} />
            </div>
            <div className="bg-lighterpink rounded-lg px-4 py-1">{temperature} °C</div>
          </div>

          <div className="flex items-center space-x-4 mt-2 mb-4">
            <div>
              <Umbrella size={smaller ? 20 : 28} />
            </div>
            <div className="bg-lighterblue rounded-lg px-4 py-1">{precipitation} mm</div>
          </div>
        </div>
        {hasAccidents ? (
          <>
            <p>Weather looks fine, it should be comfortable to ride a bike!</p>
            <p className="text-red-600 text-lg">
              <span className="text-2xl">{2} </span>accidents are going to happen!
            </p>
          </>
        ) : (
          <>
            <p>It is completely safe to ride a bike today, no accident is going to happen! 🔥</p>
            <p>{temperature} °C is comfortable for bike riding. Have fun!</p>
          </>
        )}

        {hasAccidents && (
          <WithAccidentModal accident={accidents[0].attributes}>
            {(onModalOpen) => (
              <div className="card-actions justify-end mt-4 mb-2">
                <Button
                  extraClasses="bg-lightpurple/60 text-black border-none hover:bg-lightpurple"
                  onClick={onModalOpen}
                  label="See Accident details!"
                />
              </div>
            )}
          </WithAccidentModal>
        )}
      </div>
    </div>
  )
}

const HomeDayCard: React.FC<CardProps> = (props) => {
  const { title } = props
  return (
    <>
      {title ? (
        <div className="w-1/3 flex flex-col">
          <h1 className="text-2xl text-center pb-8 text-blue-800 grow grid place-items-center">{title}</h1>
          <Card {...props} accidents={props.accidents} />
        </div>
      ) : (
        <Card {...props} />
      )}
    </>
  )
}

export { HomeDayCard }
