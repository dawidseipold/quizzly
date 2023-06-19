import { NextRequest, NextResponse } from "next/server"
import { Prisma, Quiz, QuizType } from "@prisma/client"

import prisma from "@/lib/db/prisma"

interface SearchParams {
  type: QuizType
  verified: "true" | "false"
}

// TODO: REMOVE THIS ROUTE LATER ON!!!
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const type = searchParams.get("type") as QuizType
  const verified = searchParams.get("verified")

  try {
    const data = await prisma.quiz.findMany({
      where: {
        ...(type && { type: type }),
        ...(verified && { verified: verified === "true" }),
      },
    })

    if (!data) {
      return null
    }

    return NextResponse.json({ data })
  } catch (error) {
    return error
  }
}
