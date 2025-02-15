import { useQuery } from '@tanstack/react-query'

import { client } from '../api/client'
import { useProfile } from './use-auth'

export function useProfileQuery() {
  const actions = useProfile((state) => state.actions)
  return useQuery({
    queryKey: ['loadProfile'],
    queryFn: async () => {
      const session = await client.signIn()
      const info = await client.getProfile()
      actions.load(info)
      console.log('authenticated', session)
      return info
    },
  })
}
