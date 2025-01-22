import React, { useCallback } from 'react'
import { useNavigate } from 'zmp-ui'

import { TopicDto } from '../models'
import { useExplorer } from '../use-explorer'
import CategorySection from './category-section'
import { ExplorerSkeleton } from './explorer-skeleton'
import { TopicCard } from './topic-card'

export const CategoriesList: React.FC = () => {
  const { categories, isLoading } = useExplorer()
  const nav = useNavigate()

  const handleTopicClick = useCallback(
    (topic: TopicDto) => {
      console.log('go to topic page', topic)
      nav(`/topics/${topic.id}`, { animate: true, direction: 'forward' })
    },
    [nav],
  )

  return (
    <>
      {isLoading && <ExplorerSkeleton />}
      {!isLoading && categories.length == 0 && 'No data'}
      {!isLoading && (
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
    </>
  )
}
