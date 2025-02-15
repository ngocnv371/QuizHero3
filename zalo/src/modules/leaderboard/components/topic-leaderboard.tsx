import React from 'react'
import { useParams } from 'react-router-dom'

import { TopicBar } from '@/modules/topic/components/topic-bar'

import { useLeaderboardQuery } from '../use-leaderboard'
import { Leaderboard } from './leaderboard'

export const TopicLeaderboard: React.FC = () => {
  const { topicId } = useParams()

  const { data, isLoading } = useLeaderboardQuery(+topicId!)

  return (
    <>
      <TopicBar topicId={topicId!} tab="leaderboard" />

      <Leaderboard items={data!} loading={isLoading} />
    </>
  )
}
