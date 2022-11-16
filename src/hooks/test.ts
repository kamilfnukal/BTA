import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const getJohnDoe = async () => {
  const response = await axios.get('/api/hello/')
  return response.data
}

export const useJohnDoe = () => {
  return useQuery(['john-doe'], () => getJohnDoe(), {
    staleTime: 60 * 60
  })
}
