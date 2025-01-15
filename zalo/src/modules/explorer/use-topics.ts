import { useQuery } from '@tanstack/react-query'

import { client } from '../api/client'
import { useExplorer } from './use-explorer'

export function useTopics() {
  const actions = useExplorer((state) => state.actions)
  return useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      console.log('fetching topics')
      const { items } = await client.getTopics()
      actions.load(...items!)
      console.log('fetched topics', items)
      return items
    },
    staleTime: 1000 * 60 * 60,
  })
}
