import React, { useState } from 'react'
import { BottomNavigation, Icon, useNavigate } from 'zmp-ui'

import { Routes } from '@/constants/routes'

import { useExplorer } from '../use-explorer'

type MenuType = 'topics' | 'history' | 'profile'

export function ExplorerTabs({ activeTab }: { activeTab: MenuType }) {
  const navigate = useNavigate()
  const { isLoading } = useExplorer()

  const [tab, setTab] = useState(activeTab)

  function handleTabChange(tab: string) {
    setTab(tab as MenuType)
    let url = Routes.explorer.page()
    switch (tab) {
      case 'history':
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
      <BottomNavigation.Item className="z-10" label="History" key="history" icon={<Icon icon="zi-note" />} />
      <BottomNavigation.Item key="profile" label="Profile" icon={<Icon icon="zi-user-circle" />} />
    </BottomNavigation>
  )
}
