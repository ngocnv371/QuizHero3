import React from 'react'
import { HistoryEmpty } from './history-empty'
import { HistoryLoading } from './history-loading'
import { useHistoryQuery } from '../use-history-query'
import { Avatar, List } from 'zmp-ui'

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
        <List.Item
          key={d.id}
          prefix={<Avatar src={d.topicAvatarUrl} />}
          title={d.topic}
          subTitle={d.quiz}
          suffix={
            <span>
              {d.score}/{d.maxScore}
            </span>
          }
        ></List.Item>
      ))}
    </List>
  )
}
