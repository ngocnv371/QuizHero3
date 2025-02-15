import dayjs from 'dayjs'
import React, { useCallback, useMemo } from 'react'
import { Avatar, List, useNavigate } from 'zmp-ui'

import { Routes } from '@/constants/routes'
import { QuizResultDto } from '@/modules/api/models'

import { ScoreLabel } from './score-label'

type Props = {
  item: QuizResultDto
}

export const HistoryItem: React.FC<Props> = ({ item }) => {
  const nav = useNavigate()

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const id = e.currentTarget.getAttribute('data-topic-id')
      console.log('clicked', id)
      nav(Routes.topic.page(+id!), { animate: true, direction: 'forward', replace: false })
    },
    [nav],
  )

  const distance = useMemo(() => {
    return dayjs(item.created_at).fromNow()
  }, [item.created_at])

  return (
    <List.Item
      key={item.id}
      prefix={<Avatar src={item.quiz.topic.logo_url} />}
      title={item.quiz.topic.name}
      subTitle={distance}
      data-topic-id={item.quiz.topic.id}
      onClick={handleClick}
      suffix={<ScoreLabel score={item.score} maxScore={item.maxScore} />}
    >
      {item.quiz.name}
    </List.Item>
  )
}
