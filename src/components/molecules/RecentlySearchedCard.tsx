import { Globe, ExternalLink } from 'react-feather'
import { Coord } from '../../types'
import { RecentlySearchedTrips } from '../../utils/firebase'
import { FromToLine } from '../atoms'

type RecentlySearchedCardProps = RecentlySearchedTrips & {
  pinned?: boolean
}

const CoordsLine: React.FC<{ coord: Coord }> = ({ coord: { lat, lng } }) => {
  return (
    <div className="flex space-x-2 items-center font-light text-black/50">
      <Globe size={14} />
      <span className="text-xs">{lat}</span>
      <span>&bull;</span>
      <span className="text-xs">{lng}</span>
    </div>
  )
}

export const RecentlySearchedCard: React.FC<RecentlySearchedCardProps> = ({ from, to }) => {
  return (
    <div className="flex shadow-md border border-lighterblue w-1/2 h-44 space-x-6 py-4 group">
      <FromToLine />
      <div className="flex flex-col justify-between truncate">
        <div className="flex flex-col">
          <span className="text-lg truncate">{from.name}</span>
          <CoordsLine coord={from} />
        </div>
        <div className="flex flex-col">
          <span className="text-lg">{to.name}</span>
          <CoordsLine coord={to} />
        </div>
      </div>

      {/* TODO change default to hidden */}
      {/* TODO: add the same hvoer effect as for pin in LocationCard */}
      {/* TODO: add redirect to /plan-trip-page and pass correct query parameters to URL */}
      <button className="grid group-hover:grid place-items-center mt-auto h-10 w-10 rounded-full z-10 shadow-md bg-lighterpink">
        <ExternalLink size={20} />
      </button>
    </div>
  )
}
