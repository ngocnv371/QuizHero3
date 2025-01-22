import React from 'react'
import { Header } from 'zmp-ui'

import { useTopics } from '../use-topics'
import { CategoriesList } from './categories-list'

export const TopicsPage: React.FC = () => {
  console.log('render topics page')
  useTopics()

  return (
    <div key="topics-page">
      <Header title="Topics" showBackIcon={false} className="no-divider" />
      <div style={{ height: 30 }} />
      <CategoriesList />
      <div className="bg-white" style={{ height: 48 }} />
    </div>
  )
}
