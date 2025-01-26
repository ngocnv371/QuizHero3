import { produce } from 'immer'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { storage } from '@/utils/storage'

import { IdentityUserDto } from '../api/models'
import { client } from '../api/client'

export type ProfileState = {
  profile: IdentityUserDto
  isLoading: boolean
  error: string
  actions: {
    load: (payload: IdentityUserDto) => void,
    updateLocation: (city: string, province: string) => Promise<void>
  }
}

export const useProfile = create(
  persist<ProfileState>(
    (set) => ({
      profile: {} as IdentityUserDto,
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

          updateLocation: async (city, province) => {
            set(
              produce<ProfileState>((state) => {
                state.profile.extraProperties.city = city;
                state.profile.extraProperties.province = province;
              }),
            )
            await client.updateLocation({city, province})
            console.log('location updated', city, province)
          },
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
