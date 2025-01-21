import React, { useCallback, useEffect } from 'react'
import { Button, Icon, useNavigate } from 'zmp-ui'

import { useQuickQuiz } from '../use-quick-quiz'

type Props = {
  topicId: string
}
export const QuickStartButton: React.FC<Props> = ({ topicId }) => {
  const nav = useNavigate()
  const [enabled, setEnabled] = React.useState(false)
  const { data, isLoading } = useQuickQuiz(topicId, enabled)

  const handleStart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      console.log('start a quiz in topic', topicId)
      setEnabled(true)
    },
    [topicId, setEnabled],
  )

  useEffect(() => {
    if (!data) return

    nav(`/quiz/${data.id}/player`, { animate: true, direction: 'forward' })
  }, [data, nav])

  return (
    <Button
      className="relative after:content-[''] after:absolute after:-inset-2 after:bg-transparent"
      icon={<Icon icon="zi-play-solid" />}
      size="large"
      loading={isLoading}
      variant="primary"
      onClick={handleStart}
    />
  )
}
