import React, { useMemo } from 'react'
import { Picker } from 'zmp-ui'
import { PickerColumnOption } from 'zmp-ui/picker'
import { useLocationsQuery } from '../use-locations-query'

type Props = {
  parent: string
  value: string
  onChange: (value: string) => void
}

export const ProvincePicker: React.FC<Props> = ({ parent, value, onChange }) => {
  const name = 'Province'
  const { data, isLoading } = useLocationsQuery()
  const provinces = useMemo(() => {
    if (!data) {
      return []
    }

    return data
      .filter((d) => d.parentCode === parent)
      .map((c) => ({ displayName: c.name, value: c.code, key: c.code }) as PickerColumnOption)
  }, [data, parent])

  const selectedOption = useMemo(() => {
    return {
      [name]: value,
    }
  }, [value])

  if (isLoading) {
    return null
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
          options: provinces,
          name,
        },
      ]}
    />
  )
}
