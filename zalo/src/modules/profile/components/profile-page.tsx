import React from 'react'
import { Header, List } from 'zmp-ui'

import { LocationSettingItem } from './location-setting-item'
import { PrivacySettingItem } from './privacy-setting-item'
import { SecuritySettingItem } from './security-setting-item'
import { UserItem } from './user-item'

export const ProfilePage: React.FC = () => {
  return (
    <>
      <Header title="Profile" showBackIcon={false} className="no-divider" />
      <List>
        <UserItem />
        <LocationSettingItem />
        <SecuritySettingItem />
        <PrivacySettingItem />
      </List>
    </>
  )
}
