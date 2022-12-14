import clsx from 'clsx'
import { useState, useCallback } from 'react'
import { useRecentlySearched } from '../../hooks/planTrip'
import { RecentlySearchedCard } from '../molecules'

type RecentlySearchedSectionProps = {
  extraWrapperClasses?: string
}

export const RecentlySearchedSection: React.FC<RecentlySearchedSectionProps> = ({ extraWrapperClasses = '' }) => {
  const { data: recentlySearchedTrips } = useRecentlySearched()
  const [limit, setLimit] = useState<number | null>(4)

  const onShowMore = useCallback(() => {
    setLimit(null)
  }, [])

  return (
    <div className={clsx(extraWrapperClasses, !limit && 'h-96 overflow-y-auto')}>
      <div className="grid grid-cols-2 gap-4">
        {(recentlySearchedTrips ? (limit ? recentlySearchedTrips.slice(0, limit) : recentlySearchedTrips) : []).map(
          (recentlySearched) => (
            <RecentlySearchedCard {...recentlySearched} />
          )
        )}
      </div>
      {recentlySearchedTrips && recentlySearchedTrips.length > 4 && limit && (
        <button
          onClick={onShowMore}
          className="text-sm mt-3 py-1 border border-lighterblue w-full shadow-md rounded-lg hover:bg-lighterblue/50 hover:border-lighterblue"
        >
          Show more
        </button>
      )}
    </div>
  )
}
