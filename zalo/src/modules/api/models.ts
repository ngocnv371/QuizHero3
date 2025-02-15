export interface ListResultDto<T> {
  items: T[]
  totalCount: number
}

export type CreateQuestionResultDto = {
  question_id: string
  is_correct: boolean
}

export type CreateQuizResultDto = {
  quiz_id: string
  question_results: CreateQuestionResultDto[]
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
  quiz_id?: string
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
