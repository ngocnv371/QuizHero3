import { TopicDto } from '../explorer/models'
import { LeaderboardItem } from '../leaderboard/models'
import { QuizDto } from '../quiz/models'
import {
  CreateQuizResultDto,
  IdentityUserDto,
  ListResultDto,
  LocationDto,
  QuizResultDto,
  QuizResultQuery,
  UpdateLocationInputDto,
  UserLocationDto,
} from './models'

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
  if (response.status === 204) {
    return null
  }

  return response.json()
}

export const client = {
  setToken: (accessKey: string) => {
    _accessKey = accessKey
  },
  getTopics: async () => {
    try {
      const response = await fetch(`${apiUrl}/topics`, {
        method: 'GET',
        headers: getDefaultHeaders(),
      })
      const data = await handleResponse(response)
      return data as ListResultDto<TopicDto>
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  },
  getQuickQuiz: async (topicId: string) => {
    try {
      const response = await fetch(`${apiUrl}/quizzes/quick/${topicId}`, {
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
  getQuizzes: async (topicId: string) => {
    try {
      const response = await fetch(`${apiUrl}/quizzes?topicId=${topicId}`, {
        method: 'GET',
        headers: getDefaultHeaders(),
      })
      const data = await handleResponse(response)
      return data as ListResultDto<QuizDto>
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
  likeTopic: async (topicId: string, liked: boolean) => {
    try {
      const response = await fetch(`${apiUrl}/topics/${topicId}/like`, {
        method: 'PUT',
        headers: {
          ...getDefaultHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ liked }),
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
      return data as ListResultDto<LeaderboardItem>
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  },
  getFavourites: async () => {
    try {
      const response = await fetch(`${apiUrl}/topics/favourites`, {
        method: 'GET',
        headers: getDefaultHeaders(),
      })
      const data = await handleResponse(response)
      return data as ListResultDto<TopicDto>
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  },
  getProfile: async () => {
    try {
      const response = await fetch(`${apiUrl}/zalo/profile`, {
        method: 'GET',
        headers: getDefaultHeaders(),
      })
      const data = await handleResponse(response)
      return data as IdentityUserDto
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  },
  getUserLocation: async () => {
    try {
      const response = await fetch(`${apiUrl}/user-locations`, {
        method: 'GET',
        headers: getDefaultHeaders(),
      })
      const data = await handleResponse(response)
      return data as UserLocationDto
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  },
  updateUserLocation: async (input: UpdateLocationInputDto) => {
    try {
      const response = await fetch(`${apiUrl}/user-locations`, {
        method: 'PUT',
        headers: {
          ...getDefaultHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })
      await handleResponse(response)
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  },
  getQuizResults: async (input: QuizResultQuery) => {
    try {
      const response = await fetch(`${apiUrl}/quiz-results?quizId=${input.quizId}`, {
        method: 'GET',
        headers: getDefaultHeaders(),
      })
      const data = await handleResponse(response)
      return data as ListResultDto<QuizResultDto>
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  },
  getLocations: async () => {
    try {
      const response = await fetch(`${apiUrl}/locations?MaxResultCount=1000`, {
        method: 'GET',
        headers: getDefaultHeaders(),
      })
      const data = await handleResponse(response)
      return data as ListResultDto<LocationDto>
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  },
}
