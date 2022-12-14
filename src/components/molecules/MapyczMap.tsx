import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Map, MouseControl, SyncControl, ZoomControl } from 'react-mapycz'
import { END_AT_INPUT_ID, START_FROM_INPUT_ID } from '../../const'
import { useMapLoaderScript, useSetupSuggestListeners } from '../../hooks/mapycz'
import { useCreateRecentlySearched, useRecentlySearched } from '../../hooks/planTrip'
import { Coord, PlanTripPageProps } from '../../types'
import { MapDynamicPath, MapMarkers } from '../atoms'

type CoordWithName = Coord & { name: string }

const useSubmitRecentlySearched = (from?: CoordWithName, to?: CoordWithName) => {
  const { data: session } = useSession()
  const { mutate: createRecentlySearched } = useCreateRecentlySearched()
  const { refetch } = useRecentlySearched()

  useEffect(() => {
    if (from && to) {
      createRecentlySearched(
        {
          from,
          to,
          userEmail: session?.user?.email ?? ''
        },
        {
          onSuccess: () => {
            console.log('Sucessfully submitted recentlySearched')
            // TODO: invalidate query instead of refetching
            refetch()
          }
        }
      )
    }
  }, [from, to])
}

type MapyczMapProps = { locationAccidents: PlanTripPageProps['locationAccidents'] }

const MapyczMap: React.FC<MapyczMapProps> = ({ locationAccidents }) => {
  const [from, setFrom] = useState<CoordWithName | undefined>(undefined)
  const [to, setTo] = useState<CoordWithName | undefined>(undefined)

  useSubmitRecentlySearched(from, to)

  useMapLoaderScript()
  useSetupSuggestListeners([
    {
      id: START_FROM_INPUT_ID,
      onClick: ({ data: { latitude, longitude, phrase } }) => setFrom({ lat: latitude, lng: longitude, name: phrase })
    },
    {
      id: END_AT_INPUT_ID,
      onClick: ({ data: { latitude, longitude, phrase } }) => setTo({ lat: latitude, lng: longitude, name: phrase })
    }
  ])

  const coords = ([] as typeof locationAccidents[0])
    .concat(...Object.values(locationAccidents))
    .map(({ lat, lng }) => ({ lat, lng }))

  return (
    <Map
      height="100%"
      loadingElement={<div className="bg-lighterpink w-full h-full">Loading map...</div>}
      center={{
        lat: 49.209,
        lng: 16.635
      }}
    >
      <ZoomControl />
      <MouseControl zoom={true} pan={true} wheel={true} />
      <SyncControl />

      {from && to && <MapDynamicPath criterion="fast" coords={[from, to]} />}

      <MapMarkers
        // TODO: replace with accident markers
        coords={coords}
      />
    </Map>
  )
}
export { MapyczMap }
