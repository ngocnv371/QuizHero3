import React from 'react'
import { Header, Page, Text } from 'zmp-ui'

import { PageContainer } from '@/components'
import { ProfileLayout } from '@/modules/profile/components/layout'
import { ExplorerTabs } from '@/modules/explorer/components/explorer-tabs'

export default function ProfileSecurityPage() {
  return (
    <ProfileLayout>
      <Page restoreScroll className="bg-background section-container">
        <PageContainer withBottomNav withHeader>
          <Header title="Security" className="no-divider" />
          <Text className="p-4">It's very secure, for sure!</Text>
        </PageContainer>
      </Page>
      <ExplorerTabs activeTab="profile" />
    </ProfileLayout>
  )
}
