import React, { useEffect } from 'react'
import { useSnackbar } from 'zmp-ui'

import { useFavourites } from '@/modules/explorer/use-favourites'

import { useCurrentUser } from '../use-current-user'

export function UserLoader() {
  const { data: user } = useCurrentUser()
  const { openSnackbar } = useSnackbar()
  useFavourites(user?.id != null)

  useEffect(
    () => {
      if (user?.id) {
        console.log('Welcome back', user.name)
        openSnackbar({
          text: `Welcome back, ${user.name}`,
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
