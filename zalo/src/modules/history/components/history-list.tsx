import React from 'react'
import { List } from 'zmp-ui'

import { useHistoryQuery } from '../use-history-query'
import { HistoryEmpty } from './history-empty'
import { HistoryItem } from './history-item'
import { HistoryLoading } from './history-loading'

export const HistoryList: React.FC = () => {
  const { data, isLoading } = useHistoryQuery()

  if (isLoading) {
    return <HistoryLoading />
  }

  if (!data?.length) {
    return <HistoryEmpty />
  }

  return (
    <List>
      {data.map((d) => (
        <HistoryItem key={d.id} item={d}></HistoryItem>
      ))}
    </List>
  )
}
