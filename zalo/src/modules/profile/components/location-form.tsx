import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Icon, useSnackbar } from 'zmp-ui'

import { client } from '@/modules/api/client'

import { useLocationsQuery } from '../use-locations-query'
import { useUserLocationQuery } from '../use-user-location-query'
import { CityPicker } from './city-picker'
import { ProvincePicker } from './province-picker'

export const LocationForm: React.FC = () => {
  const { data: locations } = useLocationsQuery()
  const { data: locationId, isLoading, error } = useUserLocationQuery()
  const [isSaving, setIsSaving] = useState(false)
  const [isPristine, setIsPristine] = useState(true)
  const { openSnackbar } = useSnackbar()
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const location = !locations || !locationId ? null : locations.find((l) => l.id === locationId)

  useEffect(() => {
    if (!location) {
      return
    }

    setCity(location.parent_id)
    setProvince(location.id)
    setIsPristine(true)
  }, [location])

  const handleCityChanged = useCallback((value: string) => {
    setCity(value)
    setProvince('')
    setIsPristine(false)
  }, [])

  const handleProvinceChanged = useCallback((value: string) => {
    setProvince(value)
    setIsPristine(false)
  }, [])

  const handleSave = useCallback(
    async () => {
      try {
        setIsSaving(true)
        await client.updateUserLocation({
          locationId: province,
        })
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
      } finally {
        setIsSaving(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [province],
  )

  return (
    <Box p={4}>
      <p>Lựa chọn địa điểm sẽ sắp xếp bạn vào bảng xếp hạng của khu vực đó.</p>
      {isLoading && 'Loading...'}
      {error && 'Failed to load locations'}
      {!isLoading && !error && (
        <>
          <CityPicker value={city} onChange={handleCityChanged} />
          {city && <ProvincePicker parent={city} value={province} onChange={handleProvinceChanged} />}
          <Button className="my-4" disabled={!city || !province || isPristine || isSaving} onClick={handleSave}>
            <Icon icon="zi-save-to-collection" />
            Save
          </Button>
        </>
      )}
    </Box>
  )
}
