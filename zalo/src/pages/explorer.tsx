import React from 'react'
import { Page } from 'zmp-ui'

import { PageContainer } from '@/components'
import { ExplorerTabs } from '@/modules/explorer/components/explorer-tabs'
import { ExplorerLayout } from '@/modules/explorer/components/layout'
import { TopicsPage } from '@/modules/explorer/components/topics-page'

export default function ExplorerRootPage() {
  console.log('render explorer root page')
  return (
    <ExplorerLayout>
      <Page restoreScroll className="bg-background section-container">
        <PageContainer withBottomNav withHeader>
          <TopicsPage />
        </PageContainer>
      </Page>
      <ExplorerTabs activeTab="topics" />
    </ExplorerLayout>
  )
}
