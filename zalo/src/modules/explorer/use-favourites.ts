import { useQuery } from '@tanstack/react-query'

import { client } from '../api/client'
import { useExplorer } from './use-explorer'

export function useFavourites() {
  const actions = useExplorer((state) => state.actions)
  return useQuery({
    queryKey: ['favourites'],
    queryFn: async () => {
      console.log('fetching favourites')
      actions.startLoading()
      const { items } = await client.getFavourites()
      actions.load(items)
      console.log('fetched favourites', items)
      actions.stopLoading()
      return items
    },
    staleTime: 1000 * 60 * 60,
  })
}
