import React from 'react'
import { Header, List, Page } from 'zmp-ui'

import { PageContainer } from '@/components'
import { ExplorerTabs } from '@/modules/explorer/components/explorer-tabs'
import { ProfileLayout } from '@/modules/profile/components/layout'
import { LocationSettingItem } from '@/modules/profile/components/location-setting-item'
import { PrivacySettingItem } from '@/modules/profile/components/privacy-setting-item'
import { SecuritySettingItem } from '@/modules/profile/components/security-setting-item'
import { UserItem } from '@/modules/profile/components/user-item'

export default function ProfileRootPage() {
  return (
    <ProfileLayout>
      <Page restoreScroll className="bg-background section-container">
        <PageContainer withBottomNav withHeader>
          <Header title="Profile" showBackIcon={false} className="no-divider" />
          <List>
            <UserItem />
            <LocationSettingItem />
            <SecuritySettingItem />
            <PrivacySettingItem />
          </List>
        </PageContainer>
      </Page>
      <ExplorerTabs activeTab="profile" />
    </ProfileLayout>
  )
}
