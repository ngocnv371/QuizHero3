import React from 'react'
import { Page } from 'zmp-ui'

import { PageContainer } from '@/components'
import { ExplorerTabs } from '@/modules/explorer/components/explorer-tabs'
import { FavouritesPage } from '@/modules/explorer/components/favourites-page'
import { ExplorerLayout } from '@/modules/explorer/components/layout'

export default function FavouritesRootPage() {
  console.log('render favourites root page')
  return (
    <ExplorerLayout>
      <Page restoreScroll hideScrollbar>
        <PageContainer withBottomNav>
          <FavouritesPage />
        </PageContainer>
      </Page>
      <ExplorerTabs activeTab="favourites" />
    </ExplorerLayout>
  )
}
