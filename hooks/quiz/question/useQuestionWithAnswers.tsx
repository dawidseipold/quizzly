import { Answer, Question } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export interface QuestionWithAnswers extends Question {
  answers: Answer[]
}

export interface QuestionWithAnswersWithoutIsCorrect extends Question {
  answers: Array<Omit<Answer, "isCorrect">>
}

export const useQuestionWithAnswers = (questionId: number | null) => {
  return useQuery({
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/api/quiz/question/${questionId}`, {
          headers: { Accept: "application/json" },
        })

        return data
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.message)
        }

        throw new Error("An unexpected error has occured")
      }
    },
    queryKey: [`question-${questionId}`, questionId],
    enabled: false,
  })
}

export default useQuestionWithAnswers
