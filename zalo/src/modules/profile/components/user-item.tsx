import { useProfileQuery } from '@/modules/auth/use-load-profile'
import React from 'react'
import { Avatar, List } from 'zmp-ui'
import { UserItemSkeleton } from './user-item-skeleton'

export const UserItem: React.FC = () => {
  const { data: user, isLoading } = useProfileQuery()
  if (isLoading || !user) {
    return <UserItemSkeleton />
  }

  return (
    <List.Item
      title={user.name}
      prefix={<Avatar src={user.extraProperties.avatarUrl} />}
      subTitle="This is you"
    ></List.Item>
  )
}
