import React from 'react'

import { TopicDto } from '../models'

type Props = {
  topic: TopicDto
  onClick?: (topic: TopicDto) => void
}

export function TopicCard({ topic: item, onClick }: Props) {
  return (
    <div
      className="relative border border-solid border-[#DCDFE5] rounded-lg overflow-hidden"
      onClick={() => onClick && onClick(item)}
    >
      <div className="aspect-w-16 aspect-h-12">
        <img src={item.avatarUrl} alt={item.name} className="w-full h-full object-center object-cover" />
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div className="line-clamp-2 font-bold">{item.name}</div>
        <div className="font-small line-clamp-2">{item.description}</div>
      </div>
    </div>
  )
}
