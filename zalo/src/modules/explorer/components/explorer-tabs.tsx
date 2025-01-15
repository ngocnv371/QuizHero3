import React, { useState } from 'react'
import { BottomNavigation, useNavigate } from 'zmp-ui'

import { IconCookPotSolid, IconNoteSolid } from '@/components/icons'
import { IconRestaurant } from '@/components/icons/icon-restaurant'
import { Routes } from '@/constants/routes'

import { useExplorer } from '../use-explorer'

type MenuType = 'topics' | 'favorites' | 'info'

export function ExplorerTabs({ activeTab }: { activeTab: MenuType }) {
  const navigate = useNavigate()
  const { isLoading } = useExplorer()

  const [tab, setTab] = useState(activeTab)

  function handleTabChange(tab: string) {
    setTab(tab as MenuType)
    let url = Routes.explorer.page()
    switch (tab) {
      case 'favorites':
        url = Routes.explorer.favorites()
        break
      case 'info':
        url = Routes.merchant.info()
        break
      default:
        break
    }
    navigate(url, { animate: false, replace: true })
  }

  if (isLoading) return null

  return (
    <BottomNavigation fixed activeKey={tab} onChange={handleTabChange}>
      <BottomNavigation.Item key="topics" label="Menu" icon={<IconNoteSolid />} />
      <BottomNavigation.Item className="z-10" label="Favourites" key="favorites" icon={<IconCookPotSolid />} />
      <BottomNavigation.Item key="info" label="Info" icon={<IconRestaurant />} />
    </BottomNavigation>
  )
}
