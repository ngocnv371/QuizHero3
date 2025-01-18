import React, { useCallback } from 'react'
import { Header, useNavigate } from 'zmp-ui'

import { TopicDto } from '../models'
import { useExplorer } from '../use-explorer'
import { useTopics } from '../use-topics'
import CategorySection from './category-section'
import { ExplorerSkeleton } from './explorer-skeleton'
import { TopicCard } from './topic-card'

export const TopicsPage: React.FC = () => {
  const { categories } = useExplorer()
  const { isLoading } = useTopics()
  const nav = useNavigate()

  const handleTopicClick = useCallback(
    (topic: TopicDto) => {
      console.log('go to topic page', topic)
      nav(`/topics/${topic.id}`, { animate: true, direction: 'forward' })
    },
    [nav],
  )

  if (isLoading || !categories) return <div>loading...</div>

  return (
    <div>
      <Header title="Topics" showBackIcon={false} className="no-divider" />
      <div style={{ height: 30 }} />
      {categories.length == 0 && <ExplorerSkeleton />}
      {categories.length > 0 && (
        <div className="bg-background py-4">
          <div className="px-4 flex flex-col gap-4">
            {categories.map((cat) => (
              <CategorySection key={cat.name} category={cat}>
                {cat.topics.map((topic) => (
                  <TopicCard key={topic.id} topic={topic} onClick={handleTopicClick} />
                ))}
              </CategorySection>
            ))}
          </div>
        </div>
      )}
      <div className="bg-white" style={{ height: 48 }} />
    </div>
  )
}
