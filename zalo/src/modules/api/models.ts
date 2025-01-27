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
    city: string
    province: string
  }
} 

export type UpdateLocationInputDto = {
  city: string
  province: string
}

export type QuizResultQuery = {
  quizId?: string
}

export type QuizResultDto = {
  id: string;
  quizId: string;
  topicAvatarUrl: string;
  score: number;
  maxScore: number;
  quiz: string;
  topicId: string;
  topic: string;
  creationTime: string;
}