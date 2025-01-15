import { produce } from 'immer'
import { useMemo } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { storage } from '@/utils/storage'

import { Category, Topic } from './models'

export type Explorer = {
  categories: Category[]
  topics: Topic[]
  isLoading: boolean
  actions: {
    load: (...payload: Topic[]) => void
    clear: () => void
  }
}

export const useExplorer = create(
  persist<Explorer>(
    (set) => ({
      categories: [],
      topics: [],
      isLoading: false,
      actions: {
        load: (...topics) =>
          set(
            produce<Explorer>((state) => {
              const cats = Array.from(new Set(topics.map((t) => t.category)).keys())
              state.topics = topics
              state.categories = cats.map((c) => {
                return {
                  name: c,
                  topics: topics.filter((t) => t.category === c),
                }
              })
            }),
          ),
        clear: () =>
          set(
            produce<Explorer>((state) => {
              state.categories = []
              state.topics = []
            }),
          ),
      },
    }),
    {
      name: 'dashboard',
      storage: storage,
      partialize(state) {
        return { categories: state.categories } as Explorer
      },
    },
  ),
)

export function useTopicById(id: number) {
  const { topics, isLoading } = useExplorer()
  const topic = useMemo(() => topics.find((t) => t.id === id), [topics, id])
  return { topic, isLoading }
}
