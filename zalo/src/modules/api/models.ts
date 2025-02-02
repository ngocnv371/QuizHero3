export interface ListResultDto<T> {
  items: T[]
  totalCount: number
}

export type CreateQuestionResultDto = {
  questionId: string
  isCorrect: boolean
}

export type CreateQuizResultDto = {
  quizId: string
  questionResults: CreateQuestionResultDto[]
}

export type IdentityUserDto = {
  id: string
  name: string
  extraProperties: {
    avatarUrl: string
    zaloId: string
  }
}

export type UserLocationDto = {
  locationId: string
}

export type UpdateLocationInputDto = {
  locationId: string
}

export type QuizResultQuery = {
  quizId?: string
}

export type QuizResultDto = {
  id: string
  quizId: string
  topicAvatarUrl: string
  score: number
  maxScore: number
  quiz: string
  topicId: string
  topic: string
  creationTime: string
}

export type LocationDto = {
  id: string
  name: string
  parentId: string
}
