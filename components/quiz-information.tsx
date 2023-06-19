"use client"

import Image from "next/image"
import Link from "next/link"
import { getFirstLetters } from "@/utils/helpers"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Icons } from "./icons"
import { AspectRatio } from "./ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"

const QUIZ = {
  id: 1,
  title: "Whatever",
  description:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, dignissimos.",
  type: "knowledge",
  tags: ["food"],
  verified: true,
  imageUrl: "https://i.imgur.com/y4i3J5b.png",
  rating: {
    score: 4.6,
    count: 215,
  },
  date: {
    created: "time",
    updated: "time",
  },
  user: {
    name: "Someone",
    imageUrl: "some",
    premium: true,
  },
  comments: [
    {
      id: 1,
      user: {
        name: "Someone",
        imageUrl: "some",
        premium: true,
      },
      date: {
        created: "time",
        updated: "time",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias autem ipsum magni accusamus voluptatem enim vel voluptates cumque sint maxime!",
    },
  ],
}

const QuizInformation = () => {
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-col gap-y-4">
          <ul className="flex flex-wrap items-center gap-x-2">
            <li>
              <Link href={`/browse/quiz?type=${QUIZ.type}`}>
                <Badge variant={"outline"} className="border-red-500">
                  {QUIZ.type}
                </Badge>
              </Link>
            </li>

            {QUIZ.tags.map((tag) => (
              <Link href={`/browse/quiz?tags=${tag}`}>
                <li key={tag}>
                  <Badge variant={"outline"}>{tag}</Badge>
                </li>
              </Link>
            ))}
          </ul>

          <div className="flex flex-col gap-y-2">
            <CardTitle>{QUIZ.title}</CardTitle>
            <CardDescription>{QUIZ.description}</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <AspectRatio className="relative" ratio={16 / 9}>
            <Image
              className="rounded-lg"
              src={QUIZ.imageUrl}
              alt={QUIZ.title}
              fill
            />
          </AspectRatio>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Avatar>
              <AvatarImage></AvatarImage>
              <AvatarFallback>{getFirstLetters(QUIZ.user.name)}</AvatarFallback>
            </Avatar>

            <span>{QUIZ.user.name}</span>
          </div>

          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {QUIZ.date.modified ? QUIZ.date.modified : QUIZ.date.created}
              </TooltipTrigger>
              <TooltipContent>
                <p>{QUIZ.date.modified ? "Date modified" : "Date created"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-x-1">
                <Icons.Star
                  size={20}
                  className="fill-yellow-600 text-yellow-600"
                />
                <span className="font-bold">{QUIZ.rating.score}</span>
              </TooltipTrigger>

              <TooltipContent>
                <p>{QUIZ.rating.count} reviews</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    </div>
  )
}

export default QuizInformation
