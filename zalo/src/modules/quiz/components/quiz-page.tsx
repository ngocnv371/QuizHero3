import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Header, Icon } from 'zmp-ui'

import { useQuiz, useQuizById } from '../use-quiz'
import { CompleteButton } from './complete-button'
import { QuestionItem } from './question-item'

export const QuizPage: React.FC = () => {
  const { quizId } = useParams()
  const { actions } = useQuiz()
  const { data: quiz } = useQuizById(quizId!)
  const [showSolution, setShowSolution] = React.useState(false)
  const [questionIndex, setQuestionIndex] = React.useState<number>(0)
  const [canGoNext, setCanGoNext] = React.useState(true)
  const currentQuestion = quiz?.questions[questionIndex]
  const canGoBack = questionIndex > 0
  const isLastQuestion = quiz && questionIndex === quiz.questions.length - 1

  const handleValidate = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setShowSolution(true)
    },
    [setShowSolution],
  )

  const handleBack = useCallback(() => {
    if (questionIndex <= 0) {
      console.error('Invalid question index')
      return
    }

    setQuestionIndex((prevIndex) => prevIndex - 1)
  }, [questionIndex, setQuestionIndex])

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setShowSolution(false)
      if (!quiz || questionIndex < 0 || questionIndex >= quiz.questions.length) {
        console.error('Invalid question index')
        return
      }

      // disable next button for 1 seconds
      setCanGoNext(false)
      setTimeout(() => {
        setCanGoNext(true)
      }, 1000)

      console.log('go to next question')
      setQuestionIndex((prevIndex) => prevIndex + 1)
    },
    [quiz, questionIndex, setShowSolution, setQuestionIndex],
  )

  const handleSelectAnswer = useCallback(
    (questionId: string, answerId: string) => {
      console.log('select answer', answerId)
      actions.selectAnswer({ questionId, answerId })
    },
    [actions],
  )

  if (!quiz) return null

  return (
    <div>
      <Header title={quiz.title} showBackIcon={true} className="no-divider" />
      <div style={{ height: 40 }} />
      <div className="bg-background px-2">
        {currentQuestion && (
          <QuestionItem
            key={currentQuestion.id}
            question={currentQuestion}
            showSolution={showSolution}
            onSelect={handleSelectAnswer}
          />
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full p-4 flex items-center justify-between flex-row gap-2">
        <Button onClick={handleBack} size="large" variant="tertiary" className="shrink-0" disabled={!canGoBack}>
          <Icon icon="zi-arrow-left" />
          Back
        </Button>
        <Button onClick={handleValidate} size="large" variant="secondary" disabled={showSolution} className="shrink-0">
          Check
        </Button>
        {isLastQuestion ? (
          <CompleteButton disabled={!canGoNext} quizId={quizId!} />
        ) : (
          <Button onClick={handleNext} size="large" className="shrink-0" disabled={!canGoNext}>
            Next
            <Icon icon="zi-arrow-right" />
          </Button>
        )}
      </div>
      <div className="bg-white" style={{ height: 48 }} />
    </div>
  )
}
