import React from 'react'
import { Text } from 'zmp-ui'

import plateImage from '@/static/images/plate.svg'

export function HistoryEmpty() {
  return (
    <div className="flex flex-col pt-[148px] px-[72px] gap-4 justify-center items-center">
      <div>
        <img src={plateImage} className="h-[60px]" />
      </div>
      <Text className="text-text-secondary">Danh sách lịch sử đang trống</Text>
    </div>
  )
}
