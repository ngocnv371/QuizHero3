import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Avatar, Button, Header, Icon, Progress, useNavigate } from 'zmp-ui'

import { Routes } from '@/constants/routes'
import { useProfile } from '@/modules/auth/use-auth'

import { useQuizResult } from '../use-quiz-result'

export const QuizResultPage: React.FC = () => {
  const { profile: user } = useProfile()
  const nav = useNavigate()
  const { quizId } = useParams()
  const { score, completed, total, quiz } = useQuizResult()

  const handleLeaderboard = useCallback(() => {
    console.log('go to leaderboard page')
    nav(Routes.topic.leaderboard(quiz.topic_id), { animate: true, replace: true, relative: 'route' })
  }, [nav, quiz])

  const handleRetry = useCallback(() => {
    console.log('go to retry page')
    nav(Routes.quiz.player(quizId!), { animate: true, replace: true, relative: 'route' })
  }, [nav, quizId])

  const handleHome = useCallback(() => {
    console.log('go to home page')
    nav(Routes.explorer.page(), { animate: true, direction: 'backward', replace: true, relative: 'route' })
  }, [nav])

  return (
    <div>
      <Header title="Result" showBackIcon={true} className="no-divider" />
      <div className="px-4">
        <div className="text-center">
          <Avatar size={122} src={user.user_metadata.avatar_url} className="mt-6" />
          <h2>{user.user_metadata.name}</h2>
          <p>Score: {score}</p>
        </div>
        <div className="rounded-xl p-2">
          <div className="m-4">
            <span className="text-gray-500">Completed</span>
            <Progress completed={completed} maxCompleted={total} showLabel />
          </div>
          <div className="m-4">
            <span className="text-gray-500">Correct</span>
            <Progress completed={score} maxCompleted={total} showLabel strokeColor="green" />
          </div>
          <h3 className="text-center text-green-500">You Passed!</h3>
        </div>
        <div className="text-center flex gap-2 flex-col">
          <Button size="large" variant="primary" onClick={handleLeaderboard}>
            <Icon icon="zi-poll" />
            Leaderboard
          </Button>
          <Button size="large" variant="secondary" onClick={handleRetry}>
            <Icon icon="zi-retry-solid" />
            Retry
          </Button>
          <Button size="large" variant="tertiary" onClick={handleHome}>
            <Icon icon="zi-home" />
            Home
          </Button>
        </div>
      </div>
      <div className="bg-white" style={{ height: 48 }} />
    </div>
  )
}
