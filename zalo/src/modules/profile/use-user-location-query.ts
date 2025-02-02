import { useQuery } from '@tanstack/react-query'

import { client } from '../api/client'

export function useUserLocationQuery() {
  return useQuery({
    queryKey: ['user-location'],
    queryFn: async () => {
      const location = await client.getUserLocation()
      console.log('fetched user location', location)
      return location.locationId
    },
  })
}
