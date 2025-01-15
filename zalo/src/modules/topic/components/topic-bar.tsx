import React from 'react'
import { Box, Button, Icon, useNavigate } from 'zmp-ui'

import { Routes } from '@/constants/routes'

type TopicTabs = 'quizzes' | 'leaderboard'
type Props = {
  topicId: number
  tab: TopicTabs
}

export function TopicBar(props: Props) {
  const nav = useNavigate()
  function handleChange(tab: TopicTabs) {
    console.log('change tab to', tab)
    let url = Routes.explorer.topicQuizzes(props.topicId)
    switch (tab) {
      case 'leaderboard':
        url = Routes.explorer.topicLeaderboard(props.topicId)
        break
      case 'quizzes':
        url = Routes.explorer.topicQuizzes(props.topicId)
        break
    }
    console.log('navigating to', url)
    nav(url, { animate: false, replace: true })
  }

  return (
    <Box>
      <Button
        className="relative after:content-[''] after:absolute after:-inset-2 after:bg-transparent mr-2"
        icon={<Icon icon="zi-bookmark" />}
        size="large"
        variant={props.tab === 'quizzes' ? 'primary' : 'secondary'}
        onClick={() => handleChange('quizzes')}
      />
      <Button
        className="relative after:content-[''] after:absolute after:-inset-2 after:bg-transparent mr-2"
        icon={<Icon icon="zi-poll" />}
        size="large"
        variant={props.tab === 'leaderboard' ? 'primary' : 'secondary'}
        onClick={() => handleChange('leaderboard')}
      />
    </Box>
  )
}
