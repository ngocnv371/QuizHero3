import React from 'react'
import { Header, List } from 'zmp-ui'
import { UserItem } from './user-item'
import { LocationSettingItem } from './location-setting-item'
import { SecuritySettingItem } from './security-setting-item'
import { PrivacySettingItem } from './privacy-setting-item'

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
