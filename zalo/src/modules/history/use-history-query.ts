import { useQuery } from '@tanstack/react-query'

import { client } from '../api/client'

export function useHistoryQuery() {
  return useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      console.log('fetching history')
      const { items } = await client.getQuizResults({})
      console.log('fetched history', items)
      return items
    },
    staleTime: 5 * 60 * 1000, // 5 mins
  })
}
