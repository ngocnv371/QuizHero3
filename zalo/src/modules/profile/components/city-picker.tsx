import React, { useMemo } from 'react'
import citiesMap from '@/static/tinh-thanh.json'
import { Picker } from 'zmp-ui'
import { PickerColumnOption } from 'zmp-ui/picker'

interface City {
  name: string
  name_with_type: string
  code: string
}

type Props = {
  value: string
  onChange: (value: string) => void
}

export const CityPicker: React.FC<Props> = ({ value, onChange }) => {
  const name = 'City'
  const cities = useMemo(() => {
    const keys = Object.keys(citiesMap)
    const records = citiesMap as Record<string, City>
    const items = keys
      .map((k) => records[k] as City)
      .map((c) => ({ displayName: c.name_with_type, value: c.code, key: c.code }) as PickerColumnOption)
    return items
  }, [])

  const selectedOption = useMemo(() => {
    return {
      [name]: value,
    }
  }, [value])

  return (
    <Picker
      label={name}
      helperText="Pick a city"
      mask
      maskClosable
      title={name}
      action={{
        text: 'Close',
        close: true,
      }}
      value={selectedOption}
      onChange={(evt) => onChange(evt[name].value as string)}
      data={[
        {
          options: cities,
          name,
        },
      ]}
    />
  )
}
