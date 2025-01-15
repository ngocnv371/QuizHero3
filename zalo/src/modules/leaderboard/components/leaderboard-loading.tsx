import React from 'react'

const LoadingItem: React.FC = () => {
  return (
    <div className="flex flex-row items-center p-4">
      <div className="flex-1 flex flex-row gap-2 items-end">
        <div className="bg-[#F4F5F6] text-[#F4F5F6] h-[64px] w-[64px] rounded-full" />
        <div>
          <div className="bg-[#F4F5F6] text-[#F4F5F6] h-[28px] w-[164px] rounded-lg my-2" />
          <div className="bg-[#F4F5F6] text-[#F4F5F6] h-[16px] w-[114px] rounded-lg" />
        </div>
      </div>
      <div>
        <div className="bg-[#F4F5F6] text-[#F4F5F6] h-[28px] w-[32px] rounded-lg" />
      </div>
    </div>
  )
}

export const LeaderboardLoading: React.FC = () => {
  return (
    <>
      <h4>Leaderboard</h4>
      <LoadingItem key={1} />
      <LoadingItem key={2} />
      <LoadingItem key={3} />
      <LoadingItem key={4} />
    </>
  )
}
