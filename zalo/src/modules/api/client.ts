import { getAccessToken, getUserInfo } from 'zmp-sdk'

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
import { supabase } from './supabase'

const apiUrl = `${import.meta.env.VITE_API_URL}/api/app`

let _accessKey = ''
let _userUid = ''
const getDefaultHeaders = () => ({
  ['x-zalo-access-key']: `${_accessKey}`,
  accept: 'application/json',
})

async function wrappedGetAccessToken() {
  return new Promise<string>((resolve, reject) => {
    getAccessToken({
      success(res) {
        resolve(res)
      },
      fail(err) {
        console.error('Failed to get access token', err)
        reject(err)
      },
    })
  })
}

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
  signIn: async () => {
    console.log('get access token')
    let token = await wrappedGetAccessToken()
    // HACK: use a default token for testing
    if (!token) {
      token = 'DEFAULT_ACCESS_TOKEN'
    }
    if (!token) {
      console.error('no token')
      throw new Error('no token')
    }

    const { userInfo } = await getUserInfo()
    console.log('zalo user', userInfo)
    const email = `u${userInfo.id}@zalo.com`
    const password = userInfo.id

    // attempt to sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (!error) {
      console.log('supabase signed in', data.session?.user?.email)
      _userUid = data.user.id
      return data.session
    }

    // if the user doesn't exist, sign them up
    if (error.code === 'invalid_credentials') {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userInfo.name,
            zaloId: userInfo.id,
            avatar: userInfo.avatar,
          },
        },
      })
      if (!error) {
        console.log('supabase signed in', data.session?.user?.email)
        _userUid = data.user!.id
        return data.session
      }

      if (error.code === 'email_exists') {
        console.error('supabase email exists', error)
      }

      throw error
    }

    console.error('Failed to sign in', error)
    throw error
  },
  getTopics: async () => {
    const { data, error, count } = await supabase.from('topics').select('*')
    if (error) {
      console.error('Fetch error:', error)
      throw error
    }
    return { totalCount: count, items: data } as ListResultDto<TopicDto>
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
    const { data, error, count } = await supabase.from('quizzes').select('*').eq('topic_id', topicId)
    if (error) {
      console.error('Fetch error:', error)
      throw error
    }

    return { totalCount: count, items: data } as ListResultDto<QuizDto>
  },
  getQuiz: async (quizId: string) => {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*, questions (*, answers (*))')
      .eq('id', quizId)
      .single()
    if (error) {
      console.error('Fetch error:', error)
      throw error
    }

    return data as QuizDto
  },
  likeTopic: async (topicId: number, liked: boolean) => {
    if (!liked) {
      console.log('remove like')
      const { error } = await supabase.from('user_topics').delete().eq('topic_id', topicId)
      if (error) {
        console.error('Fetch error:', error)
        throw error
      }
    } else {
      console.log('add like')
      const { error } = await supabase.from('user_topics').upsert({ topic_id: topicId })
      if (error) {
        console.error('Fetch error:', error)
        throw error
      }
    }
  },
  createQuizResult: async (result: CreateQuizResultDto) => {
    const score = result.question_results.filter((r) => r.is_correct).length
    const { data, error } = await supabase
      .from('quiz_results')
      .upsert({ quiz_id: result.quiz_id, score })
      .select()
      .single()
    if (error) {
      console.error('Insert quiz result error:', error)
      throw error
    }

    const items = result.question_results.map((r) => ({ quiz_result_id: data!.id, ...r }))
    const { error: error2 } = await supabase.from('question_results').insert(items)
    if (error2) {
      console.error('Insert question result error:', error2)
      throw error2
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
    const { data, error } = await supabase.from('user_topics').select('*')
    if (error) {
      console.error('Fetch error:', error)
      throw error
    }
    return data.map((d: { topic_id: number }) => d.topic_id)
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
    let query = supabase
      .from('quiz_results')
      .select('*, quiz:quizzes (name, topic_id, topic:topics (id, name, logo_url))')
    if (input.quiz_id) {
      query = query.eq('quiz_id', input.quiz_id)
    }
    const { data, error, count } = await query
    if (error) {
      console.error('Fetch error:', error)
      throw error
    }
    return { items: data, totalCount: count } as ListResultDto<QuizResultDto>
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
