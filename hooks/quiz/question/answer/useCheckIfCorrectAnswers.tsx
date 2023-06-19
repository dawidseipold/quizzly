import { Answer, Question } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export type AnswerWithoutIsCorrect = Omit<Answer, "isCorrect">

export interface QuestionWithAnswers extends Question {
  answers: Array<AnswerWithoutIsCorrect>
}

export const useCheckIfCorrectAnswers = (
  quizId: number,
  questionsIds: number[]
) => {
  return useQuery({
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/quiz/questions-with-answers/${quizId}?ids=${questionsIds}`,
          {
            headers: { Accept: "application/json" },
          }
        )

        return data
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.message)
        }

        throw new Error("An unexpected error has occured")
      }
    },
    queryKey: [
      `quiz-${quizId}-answers-for-${questionsIds}`,
      quizId,
      questionsIds,
    ],
    enabled: false,
  })
}

export default useCheckIfCorrectAnswers
