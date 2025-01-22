import { produce } from 'immer'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { storage } from '@/utils/storage'

import { client } from '../api/client'

export type TopicFavouritesState = {
  isLoading: boolean
  favourites: string[]
  actions: {
    load: () => Promise<void>
    updateFavourite: (payload: { topicId: string; liked: boolean }) => Promise<void>
  }
}

export const useFavourites = create(
  persist<TopicFavouritesState>(
    (set) => ({
      isLoading: false,
      favourites: [],
      actions: {
        load: async () => {
          const data = await client.getFavourites()
          console.log('user topics', data)
          set(
            produce<TopicFavouritesState>((state) => {
              state.favourites = data.items.map((item) => item.id)
              state.isLoading = false
              console.log('user topics', state.favourites)
            }),
          )
        },
        updateFavourite: async ({ topicId, liked }) => {
          console.log('update like for topic', topicId, liked)
          await client.likeTopic(topicId, liked)
          // optimistic update
          set(
            produce<TopicFavouritesState>((state) => {
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
      name: 'topic-favourites',
      storage: storage,
      partialize(state) {
        return { favourites: state.favourites } as TopicFavouritesState
      },
    },
  ),
)
