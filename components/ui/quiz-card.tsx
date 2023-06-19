"use client"

import * as React from "react"
import Image from "next/image"
import Link, { LinkProps } from "next/link"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const quizCardVariants = cva(
  "flex flex-col gap-y-4 p-4 rounded-xl bg-red-500 bg-card",
  {
    variants: {
      variant: {
        default: "outline-1 outline outline-white/10",
        ghost: "",
      },
      size: {
        default: "text-lg",
        small: "text-base",
        big: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface QuizCardProps extends VariantProps<typeof quizCardVariants> {
  id: number
  title: string
  imageUrl: string
  className?: string
}

const QuizCard: React.FC<QuizCardProps> = ({
  id,
  title,
  imageUrl,
  variant,
  size,
  className,
}) => {
  return (
    <Link
      href={`quiz/${id}`}
      className={cn(quizCardVariants({ variant, size, className }))}
    >
      <AspectRatio className="relative" ratio={16 / 9}>
        <Image className="rounded-lg" src={imageUrl} alt="title" fill />
      </AspectRatio>

      <span>{title}</span>
    </Link>
  )
}

QuizCard.displayName = "Quiz Card"

export default QuizCard
