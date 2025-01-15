import { useQuery } from '@tanstack/react-query'
import { getAccessToken, getUserInfo } from 'zmp-sdk'

import { client } from '../api/client'
import { User } from './models'
import { useAuth } from './use-auth'

export function useCurrentUser() {
  const actions = useAuth((state) => state.actions)
  return useQuery({
    queryKey: ['getUserInfo'],
    queryFn: async () => {
      const token = (await getAccessToken({})) || 'DEFAULT_ACCESS_TOKEN'
      if (!token) {
        console.error('no token')
        throw new Error('no token')
      }

      console.log('token', token)
      console.log('get user info')
      client.authenticate(token)
      const info = await getUserInfo({ autoRequestPermission: true })
      console.log('user info', info)
      const user: User = {
        id: info.userInfo.id,
        name: info.userInfo.name,
        avatar_url: info.userInfo.avatar,
      }
      actions.load(user)

      await client.authenticate(token)
      console.log('authenticated')
      return user
    },
  })
}
