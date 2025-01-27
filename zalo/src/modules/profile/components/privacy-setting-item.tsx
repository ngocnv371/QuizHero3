import { Routes } from '@/constants/routes'
import React, { useCallback } from 'react'
import { Icon, List, useNavigate } from 'zmp-ui'

export const PrivacySettingItem: React.FC = () => {
  const nav = useNavigate()
  const handleClick = useCallback(() => {
    nav(Routes.profile.privacySetting(), { animate: true, direction: 'forward' })
  }, [nav])

  return (
    <List.Item
      title="Quyền riêng tư"
      prefix={<Icon icon="zi-hide" />}
      suffix={<Icon icon="zi-chevron-right" />}
      onClick={handleClick}
    />
  )
}
