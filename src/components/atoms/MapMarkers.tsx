import { useState, useEffect } from 'react'
import { useMap } from '../../hooks/mapycz'
import { Coord } from '../../types'
import { setListener } from '../../utils'

const useWaitForMarkerLayer = () => {
  const map = useMap()
  const [loaded, setLoaded] = useState(map._layers.length >= 3)

  useEffect(() => {
    if (!loaded)
      setListener(
        () => map._layers.length >= 3,
        () => setLoaded(true)
      )
  }, [loaded])

  return loaded
}

type MyMarkerProps = Coord & { markerLayer: any; id: string }

const MyMarker: React.FC<MyMarkerProps> = ({ markerLayer, lat, lng, id }) => {
  const markerLayerLoaded = useWaitForMarkerLayer()

  useEffect(() => {
    // When changing coords of markers, the owner becomes undefined. We need to check for that.
    const isMarkerLayerDefined = markerLayer && markerLayer._owner

    if (markerLayerLoaded && isMarkerLayerDefined) {
      const coords = window.SMap.Coords.fromWGS84(lng, lat)
      const sMarker = new window.SMap.Marker(coords, id, undefined)

      markerLayer.addMarker(sMarker)

      return () => {
        markerLayer.removeMarker(sMarker, true)
      }
    }
  }, [markerLayerLoaded, markerLayer])

  return null
}

type MapMarkersProps = { coords: (Coord & { id: number })[]; onMarkerClick: (id: string) => void }

const MapMarkers: React.FC<MapMarkersProps> = ({ coords, onMarkerClick }) => {
  const map = useMap()

  const [layer, setLayer] = useState<any>(null)

  useEffect(() => {
    const l = new window.SMap.Layer.Marker('markerlayer')
    map.addLayer(l)

    // It looks like enable() si kind of async. We need to wait till the markerLayer
    // is in the map._layers. Hence we use `useWaitForMarkerLayer` in `MyMarker`
    l.enable()
    setLayer(l)

    // Listener for marker clicks
    map
      .getSignals()
      .addListener(this, 'marker-click', (e: { target: { getId: () => string } }) => onMarkerClick(e.target.getId()))

    return () => {
      map.removeLayer(l)
      // TODO: remove listener
      // map.getSignals().removeListener(this, 'marker-click')
    }
  }, [coords])

  return (
    <>
      {coords.map(({ lat, lng, id }) => (
        <MyMarker lat={lat} lng={lng} markerLayer={layer} id={id.toString()} />
      ))}
    </>
  )
}

export { MyMarker, MapMarkers }
