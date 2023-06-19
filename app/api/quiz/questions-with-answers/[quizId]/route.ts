import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/db/prisma"

interface Props {
  params: {
    quizId: string
  }
}

export async function GET(request: NextRequest, { params }: Props) {
  const { searchParams } = new URL(request.url)
  const ids = searchParams.get("ids")

  const data = await prisma.question.findMany({
    where: {
      quizId: Number(params.quizId),
      ...(ids && {
        id: { in: ids.split(",").map(Number) },
      }),
    },
    select: {
      id: true,
      text: true,
      points: true,
      type: true,
      answers: { select: { id: true, isCorrect: true } },
    },
  })

  return NextResponse.json({ data })
}
