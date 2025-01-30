import React from 'react'

type Props = {
  label: string
}

export const PickerSkeleton: React.FC<Props> = ({ label }) => {
  return (
    <div>
      <p>{label}</p>
      <div className="bg-[#EBEDEF] h-[32px] w-[full] my-2 rounded-lg" />
    </div>
  )
}
