import React from 'react'
import { Header, Page } from 'zmp-ui'

import { PageContainer } from '@/components'
import { ProfileLayout } from '@/modules/profile/components/layout'
import { ExplorerTabs } from '@/modules/explorer/components/explorer-tabs'

export default function ProfileLocationPage() {
  return (
    <ProfileLayout>
      <Page restoreScroll className="bg-background section-container">
        <PageContainer withBottomNav withHeader>
          <Header title="Location" className="no-divider" />
          <span>yo</span>
        </PageContainer>
      </Page>
      <ExplorerTabs activeTab="profile" />
    </ProfileLayout>
  )
}
