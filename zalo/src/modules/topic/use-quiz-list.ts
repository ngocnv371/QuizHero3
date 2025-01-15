import { useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { storage } from '@/utils/storage'

import { client } from '../api/client'
import { Quiz } from '../quiz/models'

export type QuizListState = {
  quizzes: Quiz[]
  isLoading: boolean
  actions: {
    load: (payload: Quiz[]) => void
  }
}

export const useQuizList = create(
  persist<QuizListState>(
    (set) => ({
      quizzes: [],
      isLoading: false,
      actions: {
        load: (items) =>
          set(
            produce<QuizListState>((state) => {
              state.quizzes = items
              state.isLoading = false
            }),
          ),
      },
    }),
    {
      name: 'quiz-list',
      storage: storage,
      partialize(state) {
        return { quizzes: state.quizzes } as QuizListState
      },
    },
  ),
)

export function useQuizListByTopicId(topicId: number) {
  const actions = useQuizList((state) => state.actions)
  return useQuery({
    queryKey: ['quiz-list', topicId],
    queryFn: async () => {
      console.log('fetching quiz list for topic', topicId)
      const items = await client.getQuizzes(topicId)
      const result = items as Quiz[]
      console.log('fetched quiz list', result)
      actions.load(result)
      return result
    },
    staleTime: 1000 * 60 * 60,
  })
}
