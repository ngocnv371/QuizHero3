import React, { useCallback } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useIntersectionObserver } from 'usehooks-ts'
import { Button, Header, Icon, Text, useNavigate } from 'zmp-ui'

import { TopicNotFoundError } from '@/constants/errors'
import { clsx } from '@/utils/clsx'

import { useTopicById } from '../../explorer/use-explorer'
import LikeTopicButton from './like-topic-button'
import { TopicAvatar } from './topic-avatar'
import { TopicCover } from './topic-cover'
import { TopicInfoLoading } from './topic-info-loading'

const threshold: number[] = []
for (let i = 0; i <= 1.0; i += 0.01) {
  threshold.push(i)
}

export const TopicPage: React.FC = () => {
  const nav = useNavigate()
  const { topicId } = useParams()
  const { topic, isLoading } = useTopicById(topicId!)
  const { entry, ref } = useIntersectionObserver({ threshold })

  const handleStart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      console.log('start a quiz in topic', topic)
      nav(`/quiz/${topic!.id}/player`, { animate: true, direction: 'forward' })
    },
    [topic, nav],
  )

  if (isLoading) {
    return <TopicInfoLoading />
  }

  if (!topic) {
    throw new TopicNotFoundError()
  }

  return (
    <div>
      <Header
        title={topic.name}
        showBackIcon={true}
        className={clsx(
          'opacity-0 transition-opacity ease-in-out duration-50',
          entry && entry.intersectionRatio < 0.5 && 'opacity-1',
        )}
      />
      <TopicCover coverUrl={topic.coverUrl || ''} />
      <div className="relative translate-y-[-84px] h-[84px] mb-[-84px] flex px-4 items-end">
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-b from-[#00000000] to-[#000000]" />
        <div className="relative flex-shrink-0 translate-y-[42px]">
          <TopicAvatar avatarUrl={topic.avatarUrl || ''} />
        </div>
      </div>
      <div className="pt-[52px] px-4 pb-3">
        <div className="flex flex-col space-y-4">
          <div ref={ref}>
            <Text size="xLarge" className="font-medium">
              {topic?.name}
            </Text>
          </div>
          <div className="text-text-secondary">
            <Text size="normal" className="whitespace-break-spaces">
              {topic.description}
            </Text>
          </div>
          <div className="flex items-center justify-between">
            <div className="shrink-0"></div>
            <div className="shrink-0">
              <LikeTopicButton topicId={topic.id} />
              <Button
                className="relative after:content-[''] after:absolute after:-inset-2 after:bg-transparent"
                icon={<Icon icon="zi-play-solid" />}
                size="large"
                variant="primary"
                onClick={handleStart}
              />
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
