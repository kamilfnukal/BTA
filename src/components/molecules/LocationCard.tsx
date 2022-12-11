import { UserLocation } from '../../types/api'
import Image from 'next/image'
import clsx from 'clsx'
import { X } from 'react-feather'

type LocationCardProps = UserLocation & {
  onRemove: (id: number) => void
  canPin?: boolean
}

export const LocationCard: React.FC<LocationCardProps> = ({
  onRemove,
  canPin,
  image,
  lng,
  name,
  lat,
  distance,
  note,
  locationId
}) => {
  return (
    <div className="shadow-md border border-lighterblue py-3 px-10 rounded-lg flex justify-between">
      <div className="flex space-x-4">
        <Image src={image} alt="" className="w-14 h-14 rounded-lg" />
        <div className="flex flex-col justify-between py-1">
          <h3 className="text-blue-800 font-semibold text-xl">{name}</h3>
          <div className="flex space-x-2 text-xs">
            <span>{lng}</span>
            <span>&bull;</span>
            <span>{lat}</span>
            <span>&bull;</span>
            <span>{distance}</span>
          </div>
        </div>
      </div>
      <div className={clsx('flex flex-col', note ? 'justify-between' : 'justify-end')}>
        {note && (
          <div className="flex justify-end">
            <div className="bg-lighterpink px-2 py-1 rounded-lg text-xs">{note}</div>
          </div>
        )}
        <button
          onClick={() => onRemove(locationId)}
          className="flex items-center space-x-2 px-1 py-[2px] hover:text-red-700 hover:underline hover:underline-offset-4 hover:translate-x-3 hover:duration-500 group"
        >
          <X size={16} className="group-hover:opacity-50" />
          <span className="text-sm">Remove</span>
        </button>
      </div>
    </div>
  )
}
