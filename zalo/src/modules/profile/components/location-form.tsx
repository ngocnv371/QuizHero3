import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Icon, useSnackbar } from 'zmp-ui'
import { CityPicker } from './city-picker'
import { ProvincePicker } from './province-picker'
import { useProfile } from '@/modules/auth/use-auth'

export const LocationForm: React.FC = () => {
  const { profile: user, actions } = useProfile()
  const [isPristine, setIsPristine] = useState(true)
  const { openSnackbar } = useSnackbar()
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')

  useEffect(() => {
    setCity(user?.extraProperties.city)
    setProvince(user?.extraProperties.province)
    setIsPristine(true)
  }, [user])

  const handleCityChanged = useCallback((value: string) => {
    setCity(value)
    setProvince('')
    setIsPristine(false)
  }, [])

  const handleProvinceChanged = useCallback((value: string) => {
    setProvince(value)
    setIsPristine(false)
  }, [])

  const handleSave = useCallback(async () => {
    try {
      await actions.updateLocation(city, province)
      openSnackbar({
        text: 'Location updated',
        duration: 3000,
        type: 'success',
      })
      setIsPristine(true)
    } catch {
      openSnackbar({
        text: 'Failed to update location',
        type: 'error',
      })
    }
  }, [city, province, actions])

  return (
    <Box p={4}>
      <p>Lựa chọn địa điểm sẽ sắp xếp bạn vào bảng xếp hạng của khu vực đó.</p>
      <CityPicker value={city} onChange={handleCityChanged} />
      {city && <ProvincePicker parent={city} value={province} onChange={handleProvinceChanged} />}
      <Button className="my-4" disabled={!city || !province || isPristine} onClick={handleSave}>
        <Icon icon="zi-save-to-collection" />
        Save
      </Button>
    </Box>
  )
}
