import React, { useCallback } from 'react'
import { Avatar, List } from 'zmp-ui'

import { LeaderboardItem } from '../models'
import { LeaderboardLoading } from './leaderboard-loading'

type Props = {
  items?: LeaderboardItem[]
  loading?: boolean
}

export const Leaderboard: React.FC<Props> = ({ items, loading }) => {
  const renderItem = useCallback((input: unknown) => {
    const item = input as LeaderboardItem
    return (
      <List.Item
        key={item.id}
        className="px-0"
        title={item.name}
        prefix={<Avatar src={item.avatar_url} />}
        suffix={item.score}
        subTitle={item.score.toString()}
      />
    )
  }, [])

  if (loading) {
    return <LeaderboardLoading />
  }

  return (
    <>
      <h4>Leaderboard</h4>
      <List loading={loading} dataSource={items} renderItem={renderItem} noSpacing></List>
    </>
  )
}
