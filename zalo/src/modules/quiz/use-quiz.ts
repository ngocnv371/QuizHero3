import { useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { storage } from '@/utils/storage'

import { client } from '../api/client'
import { User } from '../auth/models'
import { AnswerDto, QuestionDto, QuizDto } from './models'

export type QuizState = {
  quiz: QuizDto
  isLoading: boolean
  selectedAnswers: Record<QuestionDto['id'], AnswerDto['id']>
  score: number
  actions: {
    load: (payload: QuizDto) => void
    selectAnswer: (payload: { questionId: QuestionDto['id']; answerId: AnswerDto['id'] }) => void
    complete: (user: User) => Promise<void>
  }
}

export const useQuiz = create(
  persist<QuizState>(
    (set, get) => ({
      quiz: {} as QuizDto,
      isLoading: false,
      selectedAnswers: {},
      score: 0,
      actions: {
        load: (quiz) =>
          set(
            produce<QuizState>((state) => {
              state.quiz = quiz
              state.isLoading = false
              state.selectedAnswers = {}
              state.score = 0
            }),
          ),
        selectAnswer: ({ questionId, answerId }) =>
          set(
            produce<QuizState>((state) => {
              // always override the selected answer
              state.selectedAnswers[questionId] = answerId
            }),
          ),
        complete: async (user) => {
          const state = get()
          let score = 0
          const results = state.quiz.questions.map((question) => {
            const selectedAnswerId = state.selectedAnswers[question.id]
            const correctAnswer = question.answers.find((answer) => answer.isCorrect)
            if (selectedAnswerId === correctAnswer?.id) {
              score++
              return { questionId: question.id, isCorrect: true }
            }
            return { questionId: question.id, isCorrect: false }
          })
          console.log('score', score, results)

          const result = {
            quizId: state.quiz.id,
            questionResults: results,
          }
          await client.createQuizResult(result)

          set(
            produce<QuizState>((state) => {
              state.score = score
            }),
          )
          return Promise.resolve()
        },
      },
    }),
    {
      name: 'quiz',
      storage: storage,
      partialize(state) {
        return { quiz: state.quiz, selectedAnswers: {} } as QuizState
      },
    },
  ),
)

export function useQuizById(quizId: string) {
  const actions = useQuiz((state) => state.actions)
  return useQuery({
    queryKey: ['quiz'],
    queryFn: async () => {
      console.log('fetching quiz by id', quizId)
      const quiz = await client.getQuiz(quizId)
      const result = quiz as QuizDto
      console.log('fetched quiz', quiz)
      actions.load(result)
      return result
    },
    staleTime: 1000 * 60 * 60,
  })
}
