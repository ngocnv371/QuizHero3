import React from 'react'
import { Header, Page } from 'zmp-ui'

import { PageContainer } from '@/components'
import { ExplorerTabs } from '@/modules/explorer/components/explorer-tabs'
import { HistoryList } from '@/modules/history/components/history-list'
import { HistoryLayout } from '@/modules/history/components/layout'

export default function HistoryRootPage() {
  console.log('render history root page')
  return (
    <HistoryLayout>
      <Page restoreScroll className="bg-background section-container">
        <PageContainer withBottomNav withHeader>
          <Header title="History" showBackIcon={false} className="no-divider" />
          <HistoryList />
        </PageContainer>
      </Page>
      <ExplorerTabs activeTab="history" />
    </HistoryLayout>
  )
}
