import React from 'react'
import { Page } from 'zmp-ui'

import { PageContainer } from '@/components'
import { ExplorerTabs } from '@/modules/explorer/components/explorer-tabs'
import { ExplorerLayout } from '@/modules/explorer/components/layout'
import { TopicPage } from '@/modules/topic/components/topic-page'

export default function TopicRootPage() {
  return (
    <ExplorerLayout>
      <Page restoreScroll hideScrollbar className="bg-background section-container">
        <PageContainer withBottomNav>
          <TopicPage />
        </PageContainer>
      </Page>
      <ExplorerTabs activeTab="topics" />
    </ExplorerLayout>
  )
}
