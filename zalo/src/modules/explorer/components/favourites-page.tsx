import React from 'react'
import { Header } from 'zmp-ui'

import { CategoriesList } from './categories-list'

export const FavouritesPage: React.FC = () => {
  console.log('render favourites page')
  return (
    <>
      <Header title="Favourites" showBackIcon={false} className="no-divider" />
      <CategoriesList />
    </>
  )
}
