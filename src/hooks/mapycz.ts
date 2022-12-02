import { useEffect, useState } from 'react'

// TODO: docs
const setSMapListener = (window: any, onReady: any) => {
  const readyListener: any = () => {
    if (window.SMap) {
      onReady()
      return
    }
    return setTimeout(readyListener, 1000)
  }
  readyListener()
}

// TODO: docs
const useMapLoaderScript = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://api.mapy.cz/loader.js'

    script.onload = () => {
      const w = window as any
      w.Loader.async = true

      // It is not possible to await it.
      // We need to wait till this gets loaded different way.
      // Thats why we need to have useSMapReadyListener
      w.Loader.load(null, { suggest: true })
    }

    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])
}

// TODO: docs
const useSMapReadyListener = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setSMapListener(window, () => setLoaded(true))
  }, [])

  useEffect(() => {
    if (!loaded) {
      return
    }

    const w = window as any
    const inputEl = document.getElementById('suggest')

    let suggest = new w.SMap.Suggest(inputEl, {
      provider: new w.SMap.SuggestProvider({
        updateParams: (params: any) => {
          console.log('changed')
          /*
            tato fce se vola pred kazdym zavolanim naseptavace,
            params je objekt, staci prepsat/pridat klic a ten se prida
            do url
          */
          // let c = m.getCenter().toWGS84()
          // params.lon = c[0].toFixed(5)
          // params.lat = c[1].toFixed(5)
          // params.zoom = m.getZoom()
          // nepovolime kategorie, ale takto bychom mohli
          //params.enableCategories = 1;
          // priorita jazyku, oddelene carkou
          // params.lang = 'cs,en'
        }
      })
    })

    suggest.addListener('suggest', (suggestData: any) => {
      // vyber polozky z naseptavace
      setTimeout(function () {
        alert(JSON.stringify(suggestData, null, 4))
      }, 0)
    })
  }, [loaded])
}

export { useSMapReadyListener, useMapLoaderScript }
