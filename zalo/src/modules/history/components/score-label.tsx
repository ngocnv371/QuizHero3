import React from 'react'

import { clsx } from '@/utils/clsx'

type Props = {
  score: number
  maxScore: number
}

export const ScoreLabel: React.FC<Props> = ({ score, maxScore }) => {
  const over70 = score > maxScore * 0.7
  const over50 = score > maxScore * 0.5
  const below50 = !over50

  return (
    <span
      className={clsx({
        ['text-green-500']: over70,
        ['text-amber-500']: over50 && !over70,
        ['text-red-500']: below50,
      })}
    >
      {score}/{maxScore}
    </span>
  )
}
