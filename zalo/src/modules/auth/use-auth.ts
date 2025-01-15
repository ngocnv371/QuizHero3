import { produce } from 'immer'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { storage } from '@/utils/storage'

import { User } from './models'

export type AuthState = {
  user: User
  isLoading: boolean
  error: string
  actions: {
    load: (payload: User) => void
  }
}

export const useAuth = create(
  persist<AuthState>(
    (set) => ({
      user: {} as User,
      isLoading: false,
      error: '',
      actions: {
        load: (user) =>
          set(
            produce<AuthState>((state) => {
              state.user = user
              state.isLoading = false
            }),
          ),
      },
    }),
    {
      name: 'quiz',
      storage: storage,
      partialize(state) {
        return { user: state.user } as AuthState
      },
    },
  ),
)
