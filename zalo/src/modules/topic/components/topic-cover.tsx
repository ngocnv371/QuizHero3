import React from 'react'

export function TopicCover({ coverUrl }: { coverUrl: string }) {
  return (
    <div className="h-[200px] bg-slate-200 overflow-hidden">
      <img alt="topic cover" src={coverUrl} className="h-[200px] object-cover object-center w-full" />
    </div>
  )
}
