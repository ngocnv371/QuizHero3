import { useQuery } from '@tanstack/react-query'

import { client } from '../api/client'
import { useExplorer } from './use-explorer'

export function useTopicsQuery() {
  const actions = useExplorer((state) => state.actions)
  return useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      console.log('fetching topics')
      actions.startLoading()
      const { items } = await client.getTopics()
      actions.load(items)
      console.log('fetched topics', items)
      actions.stopLoading()
      return items
    },
    staleTime: 1000 * 60 * 60,
  })
}
