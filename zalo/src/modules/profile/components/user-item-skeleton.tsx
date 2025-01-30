import React from 'react'

export const UserItemSkeleton: React.FC = () => {
  return (
    <div className="px-4 flex flex-col gap-3 mt-4">
      <div className="flex gap-3">
        <div className="bg-[#F7F7F8] h-[60px] w-[60px] rounded-full" />
        <div className="bg-[#EBEDEF] h-[24px] w-[108px] rounded-lg" />
      </div>
    </div>
  )
}
