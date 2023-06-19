import Link from "next/link"

import { siteConfig } from "@/config/site"
import prisma from "@/lib/db/prisma"
import { buttonVariants } from "@/components/ui/button"
import QuizCard from "@/components/ui/quiz-card"

export const IndexPage = async () => {
  const quizzes = await prisma.quiz.findMany()

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div>Pick a quiz</div>

      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <QuizCard {...quiz} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default IndexPage
