"use client"

import { useEffect, useState } from "react"
import { Question } from "@prisma/client"

import useCheckIfCorrectAnswers from "@/hooks/quiz/question/answer/useCheckIfCorrectAnswers"
import useQuestionWithAnswers, {
  QuestionWithAnswers,
  QuestionWithAnswersWithoutIsCorrect,
} from "@/hooks/quiz/question/useQuestionWithAnswers"
import useQuizWithQuestionsIds, {
  QuizWithQuestionsIds,
} from "@/hooks/quiz/useQuizWithQuestionsIds"
import { Button } from "@/components/ui/button"

type selectedAnswer = { questionId: number; answerId: number; dupa?: string }

interface PlayPageProps {
  params: {
    id: number
  }
}

const PlayPage = ({ params }: PlayPageProps) => {
  const [quiz, setQuiz] = useState<QuizWithQuestionsIds | null>(null)
  const [unusedQuestions, setUnusedQuestions] = useState<number[]>([])
  const [questionToFetch, setQuestionToFetch] = useState<number | null>(null)
  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionWithAnswersWithoutIsCorrect | null>(null)

  const [selectedAnswers, setSelectedAnswers] = useState<selectedAnswer[]>([])
  const [questionsWithAnswers, setQuestionsWithAnswers] = useState<
    QuestionWithAnswers[]
  >([])

  const [round, setRound] = useState<number>(0)

  const [quizStarted, setQuizStarted] = useState<boolean>(false)
  const [quizFinished, setQuizFinished] = useState<boolean>(false)

  const { data: quizData, isSuccess: isQuizSucces } = useQuizWithQuestionsIds(
    params.id
  )

  const {
    data: questionData,
    isSuccess: isQuestionSuccess,
    refetch: refetchQuestion,
  } = useQuestionWithAnswers(questionToFetch)

  const {
    data: answersData,
    isSuccess: isAnswersSuccess,
    refetch: refetchAnswers,
  } = useCheckIfCorrectAnswers(
    params.id,
    selectedAnswers.map((answer) => answer.questionId)
  )

  useEffect(() => {
    console.log("render")
  }, [])

  useEffect(() => {
    if (isQuizSucces) {
      setQuiz(quizData.data)
    }
  }, [isQuizSucces, quizData])

  useEffect(() => {
    if (quiz) {
      setUnusedQuestions(quiz.questions.map((question) => question.id))
    }
  }, [quiz])

  useEffect(() => {
    if (quiz && unusedQuestions.length > 0) {
      setQuestionToFetch(
        unusedQuestions[Math.floor(Math.random() * unusedQuestions.length)]
      )
    }
  }, [quiz, unusedQuestions])

  useEffect(() => {
    if (isQuestionSuccess) {
      setCurrentQuestion(questionData.data)
      setUnusedQuestions((prev) =>
        prev.filter((question) => question !== questionToFetch)
      )
      setQuestionToFetch(
        unusedQuestions[Math.floor(Math.random() * unusedQuestions.length)]
      )
    }
  }, [isQuestionSuccess, unusedQuestions, questionData, questionToFetch])

  useEffect(() => {
    if (quizFinished) {
      refetchAnswers()
    }
  }, [refetchAnswers, quizFinished])

  useEffect(() => {
    if (answersData && answersData.data) {
      setQuestionsWithAnswers(answersData.data)
    }
  }, [answersData])

  const onQuizStart = () => {
    setQuizStarted(true)

    if (unusedQuestions.length > 0) {
      refetchQuestion()
    } else {
      onQuizFinish()
    }
  }

  const onAnswerSelect = ({ questionId, answerId }: selectedAnswer) => {
    setSelectedAnswers((prev) => [
      ...prev,
      { questionId: questionId, answerId: answerId },
    ])

    if (unusedQuestions.length > 0) {
      refetchQuestion()
    } else {
      onQuizFinish()
    }
  }

  const onQuizFinish = () => {
    setQuizFinished(true)
  }

  if (!isQuizSucces || !quiz) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Quiz Title: {quiz.title}</h1>

      {!quizStarted && (
        <Button onClick={() => onQuizStart()}>Start Quiz</Button>
      )}

      {quizStarted && !quizFinished && currentQuestion && (
        <div>
          {currentQuestion.text}

          <ul>
            {currentQuestion.answers.map((answer) => (
              <li
                key={answer.id}
                onClick={() =>
                  onAnswerSelect({
                    questionId: currentQuestion.id,
                    answerId: answer.id,
                  })
                }
              >
                {answer.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      {quizFinished && questionsWithAnswers.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Correct</th>
            </tr>
          </thead>

          <tbody>
            {selectedAnswers.map((answer, index) => (
              <tr key={index}>
                <th>{answer.questionId}</th>
                <th>{answer.answerId}</th>
                <th>
                  {questionsWithAnswers
                    .filter((question) => question.id === answer.questionId)
                    .map((question) =>
                      question.answers
                        .filter(
                          (answerWithResult) =>
                            answerWithResult.id === answer.answerId
                        )
                        .map((answer) => answer.isCorrect)
                        .pop()
                    )
                    .pop()
                    ? "CORRECT"
                    : "INCORRECT"}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default PlayPage
