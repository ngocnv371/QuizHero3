import React, { useMemo } from 'react'
import { Picker, Text } from 'zmp-ui'
import { PickerColumnOption } from 'zmp-ui/picker'

import { useLocationsQuery } from '../use-locations-query'
import { PickerSkeleton } from './picker-skeleton'

type Props = {
  value: string
  onChange: (value: string) => void
}

export const CityPicker: React.FC<Props> = ({ value, onChange }) => {
  const name = 'City'
  const { data, isLoading, error } = useLocationsQuery()
  const cities = useMemo(() => {
    if (!data) {
      return []
    }

    return data
      .filter((d) => !d.parentId)
      .map((c) => ({ displayName: c.name, value: c.id, key: c.id }) as PickerColumnOption)
  }, [data])

  const selectedOption = useMemo(() => {
    return {
      [name]: value,
    }
  }, [value])

  if (isLoading) {
    return <PickerSkeleton label={name} />
  }

  if (error) {
    return <Text className="text-red-500">{error.message}</Text>
  }

  return (
    <Picker
      label={name}
      disabled={isLoading}
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
