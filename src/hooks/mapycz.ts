import { useContext, useEffect, useState } from 'react'
import { MapContext } from 'react-mapycz/lib/Map'
import { setListener } from '../utils'

type MapyczSelectedPlace = {
  data: {
    phrase: string
    latitude: number
    longitude: number
  }
}

type MapyczSearchField = {
  id: string
  onClick: (selectedPlace: MapyczSelectedPlace) => void
}

const createSuggest = (inputElement: HTMLElement | null) => {
  return new window.SMap.Suggest(inputElement, {
    provider: new window.SMap.SuggestProvider()
  })
}

const useWaitForSMap = (onReady: () => void) => {
  useEffect(() => {
    setListener(() => !!window.SMap, onReady)
  }, [])
}

// TODO: docs
const useMapLoaderScript = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://api.mapy.cz/loader.js'

    script.onload = () => {
      window.Loader.async = true

      // It is not possible to await it.
      // We need to wait till this gets loaded different way ->
      // thats why we need to have `useSMapReadyListener`
      window.Loader.load(null, { suggest: true })
    }

    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])
}

// TODO: docs
const useSetupSuggestListeners = (searchfields: MapyczSearchField[]) => {
  const [loaded, setLoaded] = useState(false)

  useWaitForSMap(() => setLoaded(true))

  useEffect(() => {
    if (!loaded) {
      return
    }

    const suggests = [] as {
      elementId: string
      suggest: any
      onClickCallback: (suggestData: MapyczSelectedPlace) => void
    }[]

    for (const { id: elementId, onClick } of searchfields) {
      const inputEl = document.getElementById(elementId)
      const suggest = createSuggest(inputEl)

      const onClickCallback = (suggestData: MapyczSelectedPlace) => onClick(suggestData)

      suggest.addListener('suggest', onClickCallback)
      suggests.push({ suggest, elementId, onClickCallback })
    }

    return () => {
      for (const { elementId, suggest, onClickCallback } of suggests) {
        suggest.removeListener(`suggest-${elementId}`, onClickCallback)
      }
    }
  }, [loaded])
}

const useMap = () => useContext<any>(MapContext)

export { useSetupSuggestListeners, useMapLoaderScript, useMap }
export type { MapyczSelectedPlace }
