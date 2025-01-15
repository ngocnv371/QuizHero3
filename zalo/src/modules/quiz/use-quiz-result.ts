import { useQuiz } from './use-quiz'

export function useQuizResult() {
  const { score, quiz, selectedAnswers } = useQuiz()
  const completed = Object.keys(selectedAnswers).length
  const total = quiz.questions.length
  return { score, completed, total }
}
