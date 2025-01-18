export interface ListResponse<T> {
  items: T[]
}

export type CreateQuestionResultDto = {
  questionId: number
  isCorrect: boolean
}

export type CreateQuizResultDto = {
  quizId: number
  questionResults: CreateQuestionResultDto[]
}
