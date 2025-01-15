import React, { useId } from 'react'
import { Text } from 'zmp-ui'

import { Category } from '../models'

type Props = React.PropsWithChildren<{
  category: Category
}>

const CategorySection: React.FC<Props> = ({ category: cat, children }) => {
  const id = useId()

  return (
    <div key={cat.name} data-id={cat.name} className={`section-wrapper-${id}`} id={`section-wrapper-${id}-${cat.name}`}>
      <Text size="large" className="font-medium" id={`section-${id}-${cat.name}`}>
        {cat.name}
      </Text>
      <div className="mt-3 grid grid-cols-2 gap-3">{children}</div>
    </div>
  )
}

export default CategorySection
