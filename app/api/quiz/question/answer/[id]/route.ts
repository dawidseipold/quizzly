import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/db/prisma"

interface Props {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: Props) {
  const data = await prisma.answer.findFirst({
    where: { id: Number(params.id) },
    select: {
      id: true,
      isCorrect: true,
    },
  })

  return NextResponse.json({ data })
}
