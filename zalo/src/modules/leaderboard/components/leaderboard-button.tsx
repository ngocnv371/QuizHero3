import React from 'react'
import { Button, Icon, useNavigate } from 'zmp-ui'

import { Routes } from '@/constants/routes'

type Props = {
  topicId: number
}

const LeaderboardButton: React.FC<Props> = ({ topicId }) => {
  const nav = useNavigate()
  const handleStart = () => {
    console.log('view leaderboard on a topic', topicId)
    nav(Routes.explorer.topicLeaderboard(topicId), { animate: false, replace: true })
  }

  return (
    <Button
      className="relative after:content-[''] after:absolute after:-inset-2 after:bg-transparent mr-2"
      icon={<Icon icon="zi-poll-solid" />}
      size="large"
      variant="primary"
      onClick={handleStart}
    />
  )
}

export default LeaderboardButton
