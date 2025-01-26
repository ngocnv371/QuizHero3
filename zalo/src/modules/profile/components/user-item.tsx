import { useLoadProfile } from '@/modules/auth/use-load-profile'
import React from 'react'
import { Avatar, List } from 'zmp-ui'

export const UserItem: React.FC = () => {
  const { data: user, isLoading } = useLoadProfile()
  if (isLoading || !user) {
    return (
      <div className="px-4 flex flex-col gap-3 mt-4">
        <div className="flex gap-3">
          <div className="bg-[#F7F7F8] h-[60px] w-[60px] rounded-full" />
          <div className="bg-[#EBEDEF] h-[24px] w-[108px] rounded-lg" />
        </div>
      </div>
    )
  }

  return (
    <List.Item
      title={user.name}
      prefix={<Avatar src={user.extraProperties.avatarUrl} />}
      subTitle="This is you"
    ></List.Item>
  )
}
