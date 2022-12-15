import { useState, useEffect } from 'react'
import { PathProps } from 'react-mapycz'
import { useMap } from '../../hooks/mapycz'

const useGeometryLayer = (coords: PathProps['coords']) => {
  const map = useMap()
  const [layer, setLayer] = useState<any>(null)

  useEffect(() => {
    const layer = new window.SMap.Layer.Geometry()
    map.addLayer(layer)
    layer.enable()

    setLayer(layer)

    return () => {
      map.removeLayer(layer)
    }
  }, [coords])

  return layer
}

const MapDynamicPath: React.FC<PathProps> = ({ coords, options, id, criterion }) => {
  const geometryLayer = useGeometryLayer(coords)

  const points = coords.map(({ lat, lng }) => window.SMap.Coords.fromWGS84(lng, lat))

  const getDynamicPath = (results: any) => {
    const newPoints = results && results.getResults().geometry
    const polyline = new window.SMap.Geometry(window.SMap.GEOMETRY_POLYLINE, id, newPoints, options)
    geometryLayer?.addGeometry(polyline)
  }

  new window.SMap.Route(points, getDynamicPath, { criterion })
  return null
}

export { MapDynamicPath }
