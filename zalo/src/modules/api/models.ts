export interface ListResultDto<T> {
  items: T[]
  totalCount: number
}

export type CreateQuestionResultDto = {
  question_id: number
  is_correct: boolean
}

export type CreateQuizResultDto = {
  quiz_id: number
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
  topic_id: string
  topic_name: string
  logo_url: string
  quiz_name: string
  score: number
  created_at: string
  max_score: number
}

export type LocationDto = {
  id: string
  name: string
  parent_id: string
}
