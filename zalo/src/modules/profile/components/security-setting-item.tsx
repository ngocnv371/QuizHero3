import { Routes } from '@/constants/routes'
import React, { useCallback } from 'react'
import { Icon, List, useNavigate } from 'zmp-ui'

export const SecuritySettingItem: React.FC = () => {
  const nav = useNavigate()
  const handleClick = useCallback(() => {
    nav(Routes.profile.securitySetting(), { animate: true, direction: 'forward' })
  }, [nav])

  return (
    <List.Item
      title="Tài khoản và bảo mật"
      prefix={<Icon icon="zi-location" />}
      suffix={<Icon icon="zi-chevron-right" />}
      onClick={handleClick}
    />
  )
}
