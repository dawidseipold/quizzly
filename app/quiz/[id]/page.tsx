import { notFound } from "next/navigation"

import prisma from "@/lib/db/prisma"
import { cn } from "@/lib/utils"
import QuizInformation from "@/components/quiz-information"

interface QuizPageProps {
  params: { id: string }
}

export async function generateStaticParams() {
  const quizzes = await prisma.quiz.findMany()

  return quizzes.map((quiz) => ({
    id: quiz.id.toString(),
  }))
}

const QuizPage = async ({ params }: QuizPageProps) => {
  const quiz = await prisma.quiz.findFirst({
    where: { id: Number(params.id) },
    include: {
      tags: true,
      questions: {
        include: { answers: true },
      },
    },
  })
  const {
    _avg: { score: rating },
  } = await prisma.rating.aggregate({
    where: {
      quizId: {
        equals: Number(params.id),
      },
    },
    _avg: {
      score: true,
    },
  })

  if (!quiz) {
    notFound()
  }

  return (
    <div>
      <QuizInformation />

      <ul>
        {quiz.questions.map((question) => (
          <li>
            {question.text}
            <ul>
              {question.answers.map((answer) => (
                <li
                  className={cn(
                    "text-red-500",
                    answer.isCorrect && "text-green-500"
                  )}
                >
                  {answer.text}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {quiz.tags.map((tag) => (
        <div key={tag.id}>{tag.name}</div>
      ))}
    </div>
  )
}

export default QuizPage
