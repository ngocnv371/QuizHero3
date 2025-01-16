import { Topic } from '../explorer/models'
import { LeaderboardItem } from '../leaderboard/models'
import { Quiz } from '../quiz/models'
import { ListResponse } from './models'

const apiUrl = `${import.meta.env.VITE_API_URL}/api/app`

type QuestionResult = {
  questionId: number
  isCorrect: boolean
}
type QuizResult = {
  score: number
  quizId: number
  questionResults: QuestionResult[]
}

let _accessKey = ''
const getDefaultHeaders = () => ({
  ['x-zalo-access-key']: `${_accessKey}`,
  accept: 'application/json',
})

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Network response was not ok')
  }
  return response.json()
}

export const client = {
  authenticate: (accessKey: string) => {
    _accessKey = accessKey
  },
  getTopics: async () => {
    try {
      const response = await fetch(`${apiUrl}/topics`, {
        method: 'GET',
        headers: getDefaultHeaders(),
      })
      const data = await handleResponse(response)
      return data as ListResponse<Topic>
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  },
  getQuizzes: async (topicId: number) => {
    try {
      const response = await fetch(`${apiUrl}/quizzes?topicId=${topicId}`, {
        method: 'GET',
        headers: getDefaultHeaders(),
      })
      const data = await handleResponse(response)
      return data as ListResponse<Quiz>
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  },
  getQuiz: async (quizId: number) => {
    try {
      const response = await fetch(`${apiUrl}/quizzes/${quizId}`, {
        method: 'GET',
        headers: getDefaultHeaders(),
      })
      const data = await handleResponse(response)
      return data as Quiz
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  },
  likeTopic: async (topicId: number) => {
    try {
      const response = await fetch(`${apiUrl}/topics/${topicId}/like`, {
        method: 'POST',
        headers: getDefaultHeaders(),
      })
      await handleResponse(response)
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  },
  unlikeTopic: async (topicId: number) => {
    try {
      const response = await fetch(`${apiUrl}/topics/${topicId}/unlike`, {
        method: 'POST',
        headers: getDefaultHeaders(),
      })
      await handleResponse(response)
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  },
  createQuizResult: async (result: QuizResult) => {
    try {
      const response = await fetch(`${apiUrl}/quiz-results`, {
        method: 'POST',
        headers: {
          ...getDefaultHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      })
      await handleResponse(response)
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  },
  getLeaderboard: async (topicId: number) => {
    try {
      const response = await fetch(`${apiUrl}/leaderboard?topicId=${topicId}`, {
        method: 'GET',
        headers: getDefaultHeaders(),
      })
      const data = await handleResponse(response)
      return data as ListResponse<LeaderboardItem>
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  },
  getFavourites: async (userId: string) => Promise.resolve({} as ListResponse<Topic>),
}
