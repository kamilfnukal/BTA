import clsx from 'clsx'
import { Bookmark, Check, CheckCircle, ExternalLink, Icon, MapPin, X } from 'react-feather'
import { Coord } from '../../types'
import { RecentlySearchedTrips } from '../../utils/firebase'
import { FromToLine } from '../atoms'

type RecentlySearchedCardProps = RecentlySearchedTrips & {
  pinned?: boolean
  onPin?: (from: Coord & { name: string }, to: Coord & { name: string }) => void
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

const PinButton: React.FC<{ onPin: () => void; HoverIcon: Icon; showOnGroupHover?: boolean }> = ({
  onPin,
  HoverIcon,
  showOnGroupHover = false
}) => {
  return (
    <button
      onClick={onPin}
      className={clsx(
        showOnGroupHover ? 'hidden group-hover/out:grid' : 'grid',
        'absolute -top-1 -right-1 h-6 w-6 bg-blue-800 place-items-center text-white rounded-full group/in hover:translate-x-2 hover:-translate-y-2 hover:duration-200 hover:h-8 hover:w-8 hover:bg-lighterblue hover:border hover:border-blue-800/30 hover:shadow-lg'
      )}
    >
      <div className="group-hover/in:hidden">
        <Bookmark size={12} />
      </div>
      <div className="hidden group-hover/in:block text-blue-800">
        <HoverIcon size={18} />
      </div>
    </button>
  )
}

export const RecentlySearchedCard: React.FC<RecentlySearchedCardProps> = ({ id, from, to, pinned, onPin }) => {
  return (
    <div className="flex shadow-md border border-lighterblue h-44 space-x-6 py-4 group/out relative pr-4 rounded-lg">
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
      <button className="absolute bottom-4 right-4 hidden group-hover/out:grid place-items-center h-10 w-10 rounded-full z-10 shadow-md bg-lighterpink">
        <ExternalLink size={20} />
      </button>

      {!pinned && onPin && <PinButton showOnGroupHover HoverIcon={Check} onPin={() => onPin(from, to)} />}

      {pinned && onPin && <PinButton onPin={() => onPin(from, to)} HoverIcon={X} />}
    </div>
  )
}
