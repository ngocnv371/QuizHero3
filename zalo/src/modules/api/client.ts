import { TopicDto } from '../explorer/models'
import { LeaderboardItem } from '../leaderboard/models'
import { QuizDto } from '../quiz/models'
import { CreateQuizResultDto, ListResponse } from './models'

const apiUrl = `${import.meta.env.VITE_API_URL}/api/app`

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
      return data as ListResponse<TopicDto>
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  },
  getQuizzes: async (topicId: string) => {
    try {
      const response = await fetch(`${apiUrl}/quizzes?topicId=${topicId}`, {
        method: 'GET',
        headers: getDefaultHeaders(),
      })
      const data = await handleResponse(response)
      return data as ListResponse<QuizDto>
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  },
  getQuiz: async (quizId: string) => {
    try {
      const response = await fetch(`${apiUrl}/quizzes/${quizId}`, {
        method: 'GET',
        headers: getDefaultHeaders(),
      })
      const data = await handleResponse(response)
      return data as QuizDto
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  },
  likeTopic: async (topicId: string) => {
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
  unlikeTopic: async (topicId: string) => {
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
  createQuizResult: async (result: CreateQuizResultDto) => {
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
  getLeaderboard: async (topicId: string) => {
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
  getFavourites: async (userId: string) => Promise.resolve({} as ListResponse<TopicDto>),
}
