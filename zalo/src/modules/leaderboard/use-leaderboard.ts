import { useQuery } from '@tanstack/react-query'

import { client } from '../api/client'

export function useLeaderboard(topicId: string) {
  return useQuery({
    queryKey: ['leaderboard', topicId],
    queryFn: async () => {
      console.log('fetching leaderboard')
      const { items } = await client.getLeaderboard(topicId)
      console.log('fetched leaderboard', items)
      return items
    },
    staleTime: 1000 * 60 * 60,
  })
}
