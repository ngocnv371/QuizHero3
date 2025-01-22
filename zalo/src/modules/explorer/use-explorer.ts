import { produce } from 'immer'
import { useMemo } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { storage } from '@/utils/storage'

import { client } from '../api/client'
import { Category, TopicDto } from './models'

export type Explorer = {
  categories: Category[]
  topics: TopicDto[]
  favourites: string[]
  isLoading: boolean
  actions: {
    load: (topics: TopicDto[]) => void
    clear: () => void
    startLoading: () => void
    stopLoading: () => void
    updateFavourite: (payload: { topicId: string; liked: boolean }) => Promise<void>
    loadFavourites: (ids: string[]) => void
  }
}

export const useExplorer = create(
  persist<Explorer>(
    (set) => ({
      categories: [],
      favourites: [],
      topics: [],
      isLoading: true,
      actions: {
        startLoading: () =>
          set(
            produce<Explorer>((state) => {
              state.isLoading = true
            }),
          ),
        stopLoading: () =>
          set(
            produce<Explorer>((state) => {
              state.isLoading = false
            }),
          ),
        load: (topics) =>
          set(
            produce<Explorer>((state) => {
              const cats = Array.from(new Set(topics.map((t) => t.category)))
              state.topics = topics
              state.categories = cats.map((c) => ({
                name: c,
                topics: topics.filter((t) => t.category === c),
              }))
            }),
          ),
        clear: () =>
          set(
            produce<Explorer>((state) => {
              state.categories = []
              state.topics = []
            }),
          ),
        loadFavourites: (ids) =>
          set(
            produce<Explorer>((state) => {
              state.favourites = ids
            }),
          ),
        updateFavourite: async ({ topicId, liked }) => {
          console.log('update like for topic', topicId, liked)
          await client.likeTopic(topicId, liked)
          // optimistic update
          set(
            produce<Explorer>((state) => {
              if (liked) {
                state.favourites = [...state.favourites, topicId]
              } else {
                state.favourites = state.favourites.filter((id) => id !== topicId)
              }
            }),
          )
        },
      },
    }),
    {
      name: 'dashboard',
      storage: storage,
      partialize(state) {
        return { categories: state.categories, topics: state.topics } as Explorer
      },
    },
  ),
)

export function useTopicById(id: string) {
  const { topics, isLoading } = useExplorer()
  const topic = useMemo(() => topics.find((t) => t.id === id), [topics, id])
  return { topic, isLoading }
}
