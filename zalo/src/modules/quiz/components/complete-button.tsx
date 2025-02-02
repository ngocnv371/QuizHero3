import React from 'react'
import { useCallback } from 'react'
import { Button, Icon, useNavigate, useSnackbar } from 'zmp-ui'

import { Routes } from '@/constants/routes'
import { RetryLoginButton } from '@/modules/auth/components/retry-login-button'
import { useProfile } from '@/modules/auth/use-auth'

import { useQuiz } from '../use-quiz'

type CompleteButtonProps = {
  disabled: boolean
  quizId: string
}

export const CompleteButton: React.FC<CompleteButtonProps> = ({ disabled, quizId }) => {
  const [loading, setLoading] = React.useState(false)
  const { actions } = useQuiz()
  const { profile: user } = useProfile()
  const nav = useNavigate()
  const { openSnackbar } = useSnackbar()

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()

      console.log('disable actions')
      setLoading(true)
      console.log('complete quiz')
      actions
        .complete()
        .then(() => {
          nav(Routes.quiz.result(quizId), { animate: true, replace: true, relative: 'route' })
        })
        .catch((e) => {
          console.error('Failed to complete quiz', e)
          openSnackbar({
            text: 'Failed to complete quiz',
            type: 'error',
            action: {
              close: true,
              text: 'OK',
            },
          })
          setLoading(false)
        })
    },
    // we don't include `openSnackbar` because it's not stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nav, quizId, actions, setLoading, user],
  )

  if (!user) {
    return <RetryLoginButton />
  }

  return (
    <Button onClick={handleClick} loading={loading} size="large" className="shrink-0" disabled={disabled}>
      Complete
      <Icon icon="zi-check" />
    </Button>
  )
}
