import React, { MouseEvent, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Icon, List, useNavigate } from 'zmp-ui'

import { QuizDto } from '@/modules/quiz/models'

import { useQuizListByTopicId } from '../use-quiz-list'
import { TopicBar } from './topic-bar'

const QuizList: React.FC = () => {
  const { topicId } = useParams()
  const { data: quizzes, isLoading, error } = useQuizListByTopicId(topicId!)
  const nav = useNavigate()

  const handleQuizClick = useCallback(
    (quizId: number) => {
      const url = `/quiz/${quizId}/player`
      console.log('navigating to', url)
      nav(url)
    },
    [nav],
  )

  const renderItem = useCallback(
    (input: unknown) => {
      const item = input as QuizDto
      return (
        <List.Item
          key={item.id}
          className="px-0"
          title={item.title}
          suffix={<Icon icon="zi-chevron-right" />}
          subTitle={item.description}
          onClick={() => handleQuizClick(item.id)}
        />
      )
    },
    [handleQuizClick],
  )

  if (isLoading) {
    return <div className="text-center mt-4">Loading...</div>
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">{error?.message}</div>
  }

  if (!quizzes) {
    return <div className="text-center mt-4 text-red-500">Empty</div>
  }

  return (
    <>
      <TopicBar topicId={+topicId!} tab="quizzes" />

      <h4>Quizzes</h4>
      {!quizzes.length && <p>No quizzes found</p>}
      <List loading={isLoading} dataSource={quizzes} renderItem={renderItem} divider noSpacing></List>
    </>
  )
}

export default QuizList
