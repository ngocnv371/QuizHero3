import React from 'react'
import { Header, Page } from 'zmp-ui'

import { PageContainer } from '@/components'
import { ExplorerTabs } from '@/modules/explorer/components/explorer-tabs'
import { ProfileLayout } from '@/modules/profile/components/layout'
import { LocationForm } from '@/modules/profile/components/location-form'

export default function ProfileLocationPage() {
  return (
    <ProfileLayout>
      <Page restoreScroll className="bg-background section-container">
        <PageContainer withBottomNav withHeader>
          <Header title="Location" className="no-divider" />
          <LocationForm />
        </PageContainer>
      </Page>
      <ExplorerTabs activeTab="profile" />
    </ProfileLayout>
  )
}
