import { produce } from 'immer'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { storage } from '@/utils/storage'

import { client } from '../api/client'

export type TopicFavouritesState = {
  isLoading: boolean
  favourites: string[]
  actions: {
    load: (userId: string) => Promise<void>
    updateFavourite: (payload: { userId: string; topicId: string; favourite: boolean }) => Promise<void>
  }
}

export const useFavourites = create(
  persist<TopicFavouritesState>(
    (set) => ({
      isLoading: false,
      favourites: [],
      actions: {
        load: async (userId) => {
          const data = await client.getFavourites(userId)
          console.log('user topics', data)
          set(
            produce<TopicFavouritesState>((state) => {
              state.favourites = []
              state.isLoading = false
            }),
          )
        },
        updateFavourite: async ({ userId, topicId, favourite }) => {
          if (favourite) {
            console.log('add favourite')
            await client.likeTopic(topicId)
          } else {
            console.log('remove favourite')
            await client.unlikeTopic(topicId)
          }
          // optimistic update
          set(
            produce<TopicFavouritesState>((state) => {
              if (favourite) {
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
      name: 'topic-favourites',
      storage: storage,
      partialize(state) {
        return { favourites: state.favourites } as TopicFavouritesState
      },
    },
  ),
)
