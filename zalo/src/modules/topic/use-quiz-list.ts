import { useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { storage } from '@/utils/storage'

import { client } from '../api/client'
import { QuizDto } from '../quiz/models'

export type QuizListState = {
  quizzes: QuizDto[]
  isLoading: boolean
  actions: {
    load: (payload: QuizDto[]) => void
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

export function useQuizListByTopicId(topicId: string) {
  const actions = useQuizList((state) => state.actions)
  return useQuery({
    queryKey: ['quiz-list', topicId],
    queryFn: async () => {
      console.log('fetching quiz list for topic', topicId)
      const { items } = await client.getQuizzes(topicId)
      const result = items
      console.log('fetched quiz list', result)
      actions.load(result)
      return result
    },
    staleTime: 1000 * 60 * 60,
  })
}
