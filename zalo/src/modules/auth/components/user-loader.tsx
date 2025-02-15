import React, { useEffect } from 'react'
import { useSnackbar } from 'zmp-ui'

import { useFavouritesQuery } from '@/modules/explorer/use-favourites'

import { useProfileQuery } from '../use-load-profile'

export function UserLoader() {
  const { data: user } = useProfileQuery()
  const { openSnackbar } = useSnackbar()
  useFavouritesQuery(user?.id != null)

  useEffect(
    () => {
      if (user?.id) {
        console.log('Welcome back', user.user_metadata.name)
        openSnackbar({
          text: `Welcome back, ${user.user_metadata.name}`,
          type: 'success',
          duration: 3000,
        })
      }
    },
    // we don't include `openSnackbar` in the dependencies array because it's not stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user],
  )
  return <></>
}
