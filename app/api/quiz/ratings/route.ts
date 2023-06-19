import { NextRequest, NextResponse } from "next/server"
import { Prisma, Quiz } from "@prisma/client"

import prisma from "@/lib/db/prisma"

type Props = { params: { quizId: number } }

interface SearchParams {
  id: string | number
}

// TODO: Custom type for request so the request is always the number
export async function GET(request: NextRequest, { params }: Props) {
  const { searchParams } = new URL(request.url)

  // const id = searchParams.get("id")

  console.log(params.quizId)

  const data = await prisma.quiz.findFirst({
    where: { id: Number(params.quizId) },
  })

  return NextResponse.json({ data })
}
