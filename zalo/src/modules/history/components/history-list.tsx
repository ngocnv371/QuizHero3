import React from 'react'
import { HistoryEmpty } from './history-empty'
import { HistoryLoading } from './history-loading'
import { useHistoryQuery } from '../use-history-query'
import { List } from 'zmp-ui'
import { HistoryItem } from './history-item'

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
