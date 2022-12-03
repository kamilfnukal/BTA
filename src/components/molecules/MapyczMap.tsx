import React, { useState } from 'react'
import { Map, MouseControl, SyncControl, ZoomControl } from 'react-mapycz'
import { END_AT_INPUT_ID, START_FROM_INPUT_ID } from '../../const'
import { useMapLoaderScript, useSetupSuggestListeners } from '../../hooks/mapycz'
import { Coord } from '../../types'
import { MapDynamicPath, MapMarkers } from '../atoms'

type MapyczMapProps = {}

const MapyczMap: React.FC<MapyczMapProps> = () => {
  const [from, setFrom] = useState<Coord | undefined>(undefined)
  const [to, setTo] = useState<Coord | undefined>(undefined)

  useMapLoaderScript()
  useSetupSuggestListeners([
    { id: START_FROM_INPUT_ID, onClick: ({ data }) => setFrom({ lat: data.latitude, lng: data.longitude }) },
    { id: END_AT_INPUT_ID, onClick: ({ data }) => setTo({ lat: data.latitude, lng: data.longitude }) }
  ])

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
        coords={[
          { lat: 49.209, lng: 16.635 },
          { lat: 49.209, lng: 16.835 },
          { lat: 49.209, lng: 16.735 }
        ]}
      />
    </Map>
  )
}
export { MapyczMap }
