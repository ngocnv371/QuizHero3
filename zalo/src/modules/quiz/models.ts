export interface AnswerDto {
  id: number
  text: string
  is_correct: boolean
}

export interface QuestionDto {
  id: number
  text: string
  answers: AnswerDto[]
}

export interface QuizDto {
  id: number
  name: string
  description: string
  questions: QuestionDto[]
}
