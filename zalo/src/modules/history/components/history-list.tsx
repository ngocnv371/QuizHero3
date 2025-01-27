import React, { useCallback } from 'react'
import { HistoryEmpty } from './history-empty'
import { HistoryLoading } from './history-loading'
import { useHistoryQuery } from '../use-history-query'
import { Avatar, List, useNavigate } from 'zmp-ui'

export const HistoryList: React.FC = () => {
  const { data, isLoading } = useHistoryQuery()
  const nav = useNavigate()

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const id = e.currentTarget.getAttribute('data-topic-id')
      console.log('clicked', id)
      nav(`/topics/${id}`, { animate: true, direction: 'forward', replace: false })
    },
    [nav],
  )

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
          data-topic-id={d.topicId}
          onClick={handleClick}
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
