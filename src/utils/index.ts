export const setListener = (isReady: () => any, onReady: () => void) => {
  const readyListener = (): NodeJS.Timeout | undefined => {
    if (isReady()) {
      onReady()
      return
    }
    return setTimeout(readyListener, 1000)
  }
  readyListener()
}
