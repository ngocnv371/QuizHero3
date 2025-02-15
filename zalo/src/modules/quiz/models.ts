export interface AnswerDto {
  id: string
  text: string
  is_correct: boolean
}

export interface QuestionDto {
  id: string
  text: string
  answers: AnswerDto[]
}

export interface QuizDto {
  id: string
  topic_id: number
  name: string
  description: string
  questions: QuestionDto[]
}
