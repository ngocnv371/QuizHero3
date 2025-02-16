import React from 'react'
import { Avatar, List } from 'zmp-ui'

import { useProfileQuery } from '@/modules/auth/use-load-profile'

import { UserItemSkeleton } from './user-item-skeleton'

export const UserItem: React.FC = () => {
  const { data: user, isLoading } = useProfileQuery()
  if (isLoading || !user) {
    return <UserItemSkeleton />
  }

  return (
    <List.Item
      title={user.user_metadata.name}
      prefix={<Avatar src={user.user_metadata.avatar_url} />}
      subTitle="This is you"
    ></List.Item>
  )
}
