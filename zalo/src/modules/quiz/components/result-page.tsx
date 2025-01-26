import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Avatar, Button, Header, Icon, Progress, useNavigate } from 'zmp-ui'

import { useProfile } from '@/modules/auth/use-auth'

import { useQuizResult } from '../use-quiz-result'

export const QuizResultPage: React.FC = () => {
  const { profile: user } = useProfile()
  const nav = useNavigate()
  const { quizId } = useParams()
  const { score, completed, total } = useQuizResult()
  const handleLeaderboard = useCallback(() => {
    console.log('go to leaderboard page')
    nav(`/leaderboard/${quizId}`, { animate: true, replace: true, relative: 'route' })
  }, [nav, quizId])
  return (
    <div>
      <Header title="Quiz Result" showBackIcon={true} className="no-divider" />
      <div style={{ height: 40 }} />
      <div className="bg-background px-4">
        <div className="text-center">
          <Avatar size={122} src={user.avatar_url} className="mt-6" />
          <h2>{user.name}</h2>
          <p>Score: {score}</p>
        </div>
        <div className="bg-background rounded-xl p-2">
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
        <div className="text-center">
          <Button size="large" variant="primary" onClick={handleLeaderboard}>
            <Icon icon="zi-poll" />
            Leaderboard
          </Button>
        </div>
      </div>
      <div className="bg-white" style={{ height: 48 }} />
    </div>
  )
}
