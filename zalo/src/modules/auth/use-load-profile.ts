import { useQuery } from '@tanstack/react-query'
import { getAccessToken, getUserInfo } from 'zmp-sdk'

import { client } from '../api/client'
import { useProfile } from './use-auth'

async function wrappedGetAccessToken() {
  return new Promise<string>((resolve, reject) => {
    getAccessToken({
      success(res) {
        resolve(res)
      },
      fail(err) {
        console.error('Failed to get access token', err)
        reject(err)
      },
    })
  })
}

export function useProfileQuery() {
  const actions = useProfile((state) => state.actions)
  return useQuery({
    queryKey: ['loadProfile'],
    queryFn: async () => {
      console.log('get access token')
      let token = await wrappedGetAccessToken()
      // HACK: use a default token for testing
      if (!token) {
        token = 'DEFAULT_ACCESS_TOKEN'
      }
      if (!token) {
        console.error('no token')
        throw new Error('no token')
      }

      console.log('token', token)
      console.log('get user info')
      client.setToken(token)
      const info = await client.getProfile()
      actions.load(info)
      console.log('authenticated')
      return info
    },
  })
}
