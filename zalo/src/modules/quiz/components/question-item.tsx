import React, { useCallback } from 'react'
import { Box, Radio, Text } from 'zmp-ui'
import { RadioValueType } from 'zmp-ui/radio'

import { clsx } from '@/utils/clsx'

import { AnswerDto, QuestionDto } from '../models'

type Props = {
  question: QuestionDto
  showSolution?: boolean
  onSelect?: (questionId: number, answerId: number) => void
}

const AnswerItem: React.FC<{
  answer: AnswerDto
  showSolution?: boolean
  selectedAnswer?: string
}> = ({ answer, showSolution, selectedAnswer }) => {
  const isSelectedAnswer = +selectedAnswer! == answer.id
  const correctAnswer = answer.is_correct
  const selectedCorrectAnswer = isSelectedAnswer && correctAnswer
  const selectedWrongAnswer = isSelectedAnswer && !correctAnswer
  return (
    <Box
      className={clsx('rounded-md', {
        'bg-green-100': showSolution && (correctAnswer || selectedCorrectAnswer),
        'bg-red-100': showSolution && selectedWrongAnswer,
        'bg-gray-100': !showSolution && isSelectedAnswer,
      })}
    >
      {showSolution && (
        <>
          {correctAnswer && !selectedCorrectAnswer && <p className="pt-2 pl-8 text-green-500">Correct answer</p>}
          {selectedCorrectAnswer && <p className="pt-2 pl-8 text-green-500">You have selected the correct answer</p>}
          {selectedWrongAnswer && <p className="pt-2 pl-8 text-red-500">You have selected the wrong answer</p>}
        </>
      )}
      <Radio label={answer.text} value={answer.id} className="p-4 w-full"></Radio>
    </Box>
  )
}

export const QuestionItem: React.FC<Props> = ({ question, showSolution, onSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = React.useState<string>()
  const handleChanged = useCallback(
    (value: RadioValueType) => {
      if (showSolution) {
        // can't change answer after show solution
        return
      }

      setSelectedAnswer(value.toString())
    },
    [setSelectedAnswer, showSolution],
  )

  // bubble up selected answer
  React.useEffect(() => {
    if (selectedAnswer === undefined) {
      return
    }

    onSelect && onSelect(question.id, +selectedAnswer)
  }, [selectedAnswer, question.id, onSelect])

  return (
    <div>
      <Box mb={5} pt={5}>
        <Text>{question.text}</Text>
      </Box>
      <Radio.Group onChange={handleChanged} value={selectedAnswer} className="w-full">
        {question.answers.map((answer) => (
          <AnswerItem key={answer.id} answer={answer} showSolution={showSolution} selectedAnswer={selectedAnswer} />
        ))}
      </Radio.Group>
    </div>
  )
}
