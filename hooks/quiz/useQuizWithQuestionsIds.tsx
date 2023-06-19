import { Question, Quiz } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export interface QuizWithQuestionsIds extends Quiz {
  questions: Pick<Question, "id">[]
}

export const useQuizWithQuestionsIds = (quizId: number | null) => {
  return useQuery({
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/api/quiz/${quizId}`, {
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
    queryKey: [`quiz-${quizId}`, quizId],
  })
}

export default useQuizWithQuestionsIds
