import React from 'react'
import { Page } from 'zmp-ui'

import { PageContainer } from '@/components'
import { ProfileLayout } from '@/modules/profile/components/layout'
import { ExplorerTabs } from '@/modules/explorer/components/explorer-tabs'
import { ProfilePage } from '@/modules/profile/components/profile-page'

export default function ProfileRootPage() {
  return (
    <ProfileLayout>
      <Page restoreScroll className="bg-background section-container">
        <PageContainer withBottomNav withHeader>
          <ProfilePage />
        </PageContainer>
      </Page>
      <ExplorerTabs activeTab="profile" />
    </ProfileLayout>
  )
}
