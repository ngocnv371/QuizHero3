import React, { useState } from 'react'
import { BottomNavigation, Icon, useNavigate } from 'zmp-ui'

import { IconRestaurant } from '@/components/icons/icon-restaurant'
import { Routes } from '@/constants/routes'

import { useExplorer } from '../use-explorer'

type MenuType = 'topics' | 'favourites' | 'profile'

export function ExplorerTabs({ activeTab }: { activeTab: MenuType }) {
  const navigate = useNavigate()
  const { isLoading } = useExplorer()

  const [tab, setTab] = useState(activeTab)

  function handleTabChange(tab: string) {
    setTab(tab as MenuType)
    let url = Routes.explorer.page()
    switch (tab) {
      case 'favourites':
        url = Routes.explorer.favorites()
        break
      case 'profile':
        url = Routes.profile.page()
        break
      default:
        break
    }
    console.log('navigate to', url)
    navigate(url, { animate: false, replace: true })
  }

  if (isLoading) return null

  return (
    <BottomNavigation fixed activeKey={tab} onChange={handleTabChange}>
      <BottomNavigation.Item key="topics" label="Topics" icon={<Icon icon="zi-home" />} />
      <BottomNavigation.Item
        className="z-10"
        label="Favourites"
        key="favourites"
        icon={<Icon icon="zi-heart-solid" />}
      />
      <BottomNavigation.Item key="profile" label="Profile" icon={<Icon icon="zi-user-circle" />} />
    </BottomNavigation>
  )
}
