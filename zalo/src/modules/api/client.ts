import { Topic } from '../explorer/models'
import { LeaderboardItem } from '../leaderboard/models'
import { Quiz } from '../quiz/models'

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
export const client = {
  authenticate: (accessKey: string) => {
    _accessKey = accessKey
  },
  getTopics: async () => {
    return await fetch(`${apiUrl}/topics`, {
      method: 'GET',
      headers: {
        ['x-zalo-access-key']: `${_accessKey}`,
        accept: 'application/json',
      },
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error('Failed to get topics')
      }
      const r = await res.json()
      console.log('topics', r)
      return r
    })
  },
  getQuizzes: async (topicId: number) => {
    return Promise.resolve([] as Quiz[])
  },
  getQuiz: async (quizId: number) => {
    return Promise.resolve({} as Quiz)
  },
  likeTopic: async (topicId: number) => {},
  unlikeTopic: async (topicId: number) => {},
  createQuizResult: async (result: QuizResult) => {},
  getLeaderboard: async (topicId: number) => {
    return Promise.resolve([] as LeaderboardItem[])
  },
}
