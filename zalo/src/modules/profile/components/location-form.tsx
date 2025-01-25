import React, { useEffect, useState } from 'react'
import { Box } from 'zmp-ui'
import { CityPicker } from './city-picker'
import { ProvincePicker } from './province-picker'

export const LocationForm: React.FC = () => {
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')

  useEffect(() => {
    setProvince('')
  }, [city])

  return (
    <Box p={4}>
      <CityPicker value={city} onChange={setCity} />
      {city && <ProvincePicker parent={city} value={province} onChange={setProvince} />}
    </Box>
  )
}
