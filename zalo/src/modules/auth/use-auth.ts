import { User } from '@supabase/supabase-js'
import { produce } from 'immer'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { storage } from '@/utils/storage'

export type ProfileState = {
  profile: User
  isLoading: boolean
  error: string
  actions: {
    load: (payload: User) => void
  }
}

export const useProfile = create(
  persist<ProfileState>(
    (set) => ({
      profile: {} as User,
      isLoading: false,
      error: '',
      actions: {
        load: (user) =>
          set(
            produce<ProfileState>((state) => {
              state.profile = user
              state.isLoading = false
            }),
          ),
      },
    }),
    {
      name: 'profile',
      storage: storage,
      partialize(state) {
        return { profile: state.profile } as ProfileState
      },
    },
  ),
)
