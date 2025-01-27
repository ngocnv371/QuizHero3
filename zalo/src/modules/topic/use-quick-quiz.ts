import { useQuery } from '@tanstack/react-query'

import { client } from '../api/client'

export function useQuickQuizQuery(topicId: string, enabled: boolean) {
  return useQuery({
    queryKey: ['quick-quiz'],
    queryFn: async () => {
      console.log('fetching quick quiz')
      const quiz = await client.getQuickQuiz(topicId)
      console.log('fetched quick quiz', quiz)
      return quiz
    },
    enabled,
  })
}
