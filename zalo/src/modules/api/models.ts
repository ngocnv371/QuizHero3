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
