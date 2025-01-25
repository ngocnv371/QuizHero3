import { Routes } from '@/constants/routes'
import React, { useCallback } from 'react'
import { Icon, List, useNavigate } from 'zmp-ui'

export const LocationSettingItem: React.FC = () => {
  const nav = useNavigate()
  const handleClick = useCallback(() => {
    nav(Routes.profile.locationSetting(), { animate: true, direction: 'forward' })
  }, [nav])

  return (
    <List.Item
      title="Bảng xếp hạng"
      subTitle="Chỉ định khu vực"
      prefix={<Icon icon="zi-location" />}
      suffix={<Icon icon="zi-chevron-right" />}
      onClick={handleClick}
    />
  )
}
