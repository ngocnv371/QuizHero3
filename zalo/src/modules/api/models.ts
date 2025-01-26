export interface ListResponse<T> {
  items: T[]
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
    city: string
    province: string
  }
} 

export type UpdateLocationInputDto = {
  city: string
  province: string
}