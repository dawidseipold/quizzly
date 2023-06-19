import { NextRequest, NextResponse } from "next/server"
import { Prisma, Quiz } from "@prisma/client"

import prisma from "@/lib/db/prisma"

type Props = { params: { quizId: number } }

// TODO: Custom type for request so the request is always the number
export async function GET(request: NextRequest, { params }: Props) {
  const data = await prisma.quiz.findFirst({
    where: { id: Number(params.quizId) },
    include: { questions: { select: { id: true } } },
  })

  return NextResponse.json({ data })
}
