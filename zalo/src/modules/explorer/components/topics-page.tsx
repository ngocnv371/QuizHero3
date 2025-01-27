import React from 'react'
import { Header } from 'zmp-ui'

import { useTopicsQuery } from '../use-topics'
import { CategoriesList } from './categories-list'

export const TopicsPage: React.FC = () => {
  console.log('render topics page')
  useTopicsQuery()

  return (
    <>
      <Header title="Topics" showBackIcon={false} className="no-divider" />
      <CategoriesList />
    </>
  )
}
