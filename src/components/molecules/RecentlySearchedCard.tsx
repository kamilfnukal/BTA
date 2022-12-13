import { ExternalLink, MapPin } from 'react-feather'
import { Coord } from '../../types'
import { RecentlySearchedTrips } from '../../utils/firebase'
import { FromToLine } from '../atoms'

type RecentlySearchedCardProps = RecentlySearchedTrips & {
  pinned?: boolean
}

const CoordsLine: React.FC<{ coord: Coord }> = ({ coord: { lat, lng } }) => {
  return (
    <div className="flex space-x-1.5 items-center font-light text-black/50">
      <MapPin size={14} />
      {/* TODO: Investigate if possible to have city here */}
      <span className="text-sm">Brno</span>
    </div>
  )
}

export const RecentlySearchedCard: React.FC<RecentlySearchedCardProps> = ({ from, to }) => {
  return (
    <div className="flex shadow-md border border-lighterblue h-44 space-x-6 py-4 group relative pr-4 rounded-lg">
      <FromToLine />
      <div className="flex flex-col justify-between truncate">
        {[from, to].map((coord) => (
          <div className="flex flex-col space-y-1 truncate">
            <span className="text-lg truncate">{coord.name}</span>
            <CoordsLine coord={coord} />
          </div>
        ))}
      </div>

      {/* TODO: add the same hvoer effect as for pin in LocationCard */}
      {/* TODO: add redirect to /plan-trip-page and pass correct query parameters to URL */}
      <button className="absolute bottom-4 right-4 hidden group-hover:grid place-items-center h-10 w-10 rounded-full z-10 shadow-md bg-lighterpink">
        <ExternalLink size={20} />
      </button>

      {/* TODO: create pin label (same as "+ Add") */}
    </div>
  )
}
