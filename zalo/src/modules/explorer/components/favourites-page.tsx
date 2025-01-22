import React from 'react'
import { Header } from 'zmp-ui'

import { CategoriesList } from './categories-list'

export const FavouritesPage: React.FC = () => {
  console.log('render favourites page')
  return (
    <div key="favourites-page">
      <Header title="Favourites" showBackIcon={false} className="no-divider" />
      <div style={{ height: 30 }} />
      <CategoriesList />
      <div className="bg-white" style={{ height: 48 }} />
    </div>
  )
}
