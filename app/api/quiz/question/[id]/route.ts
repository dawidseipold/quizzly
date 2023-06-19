import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/db/prisma"

interface Props {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: Props) {
  const data = await prisma.question.findFirst({
    where: { id: Number(params.id) },
    include: {
      answers: {
        select: {
          id: true,
          text: true,
        },
      },
    },
  })

  return NextResponse.json({ data })
}
