import React, { useMemo } from 'react'
import provincesMap from '@/static/quan-huyen.json'
import { Picker } from 'zmp-ui'
import { PickerColumnOption } from 'zmp-ui/picker'

interface Province {
  name: string
  name_with_type: string
  parent_code: string
  code: string
}

type Props = {
  parent: string
  value: string
  onChange: (value: string) => void
}

export const ProvincePicker: React.FC<Props> = ({ parent, value, onChange }) => {
  const name = 'Province'
  const provinces = useMemo(() => {
    const keys = Object.keys(provincesMap)
    const records = provincesMap as Record<string, Province>
    const items = keys
      .map((k) => records[k] as Province)
      .filter((p) => p.parent_code == parent)
      .map((c) => ({ displayName: c.name_with_type, value: c.code, key: c.code }) as PickerColumnOption)
    return items
  }, [parent])

  const selectedOption = useMemo(() => {
    return {
      [name]: value,
    }
  }, [value])

  return (
    <Picker
      label={name}
      helperText="Pick a province"
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
