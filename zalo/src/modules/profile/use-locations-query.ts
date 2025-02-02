import { useQuery } from '@tanstack/react-query'

import { client } from '../api/client'

export function useLocationsQuery() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      console.log('fetching locations')
      const { items } = await client.getLocations()
      console.log('fetched locations', items)
      return items
    },
    staleTime: Infinity,
  })
}
