import Image from 'next/image'
import clsx from 'clsx'
import { Bookmark, X } from 'react-feather'
import { UserLocation } from '../../utils/firebase'

import CITY from '../../../public/city4.jpeg'

type LocationCardProps = UserLocation & {
  onRemove: (id: string) => void
  onPin?: (id: string) => void
  pinned?: boolean
}

export const LocationCard: React.FC<LocationCardProps> = ({ onRemove, pinned = false, onPin, location, note }) => {
  return (
    <div className="shadow-md border border-lighterblue py-3 px-10 rounded-lg flex justify-between relative">
      <div className="flex space-x-4">
        <Image
          src={location.image === '' ? CITY : location.image}
          alt=""
          width={56}
          height={56}
          className="w-14 h-14 rounded-lg"
        />
        <div className="flex flex-col justify-between py-1">
          <h3 className="text-blue-800 font-semibold text-xl">{location.name}</h3>
          <div className="flex space-x-2 text-xs">
            <span>{location.coordinate.lng}</span>
            <span>&bull;</span>
            <span>{location.coordinate.lat}</span>
            <span>&bull;</span>
            <span>{location.distance}</span>
          </div>
        </div>
      </div>
      <div className={clsx('flex flex-col items-end', note ? 'justify-between' : 'justify-end')}>
        {note && (
          <div className="flex justify-end">
            <div className="bg-lighterpink px-2 py-1 rounded-lg text-xs">{note}</div>
          </div>
        )}
        <button
          onClick={() => onRemove(location.id)}
          className="flex items-center space-x-2 px-1 py-[2px] hover:text-red-700 hover:underline hover:underline-offset-4 hover:translate-x-3 hover:duration-500 group"
        >
          <X size={16} className="group-hover:opacity-50" />
          <span className="text-sm">Remove</span>
        </button>
      </div>
    </div>
  )
}
