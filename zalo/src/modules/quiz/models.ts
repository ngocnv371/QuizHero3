export interface AnswerDto {
  id: string
  text: string
  isCorrect: boolean
}

export interface QuestionDto {
  id: string
  text: string
  answers: AnswerDto[]
}

export interface QuizDto {
  id: string
  topicId: string
  topicName: string
  title: string
  description: string
  questions: QuestionDto[]
}
