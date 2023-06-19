"use client"

import Link from "next/link"
import { getFirstLetters } from "@/utils/helpers"
import { useTheme } from "next-themes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Icons } from "./icons"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

const LINKS = [
  {
    name: "home",
    url: "/",
  },
  {
    name: "quizzes",
    url: "/quizzes",
  },
  {
    name: "leaderboard",
    url: "/leaderboard",
  },
  {
    name: "pricing",
    url: "/pricing",
  },
]

const SOCIALS = [
  {
    name: "GitHub",
    icon: <Icons.GitHub />,
    url: "https://github.com/dawidseipold",
  },
  {
    name: "Twitter",
    icon: <Icons.GitHub />,
    url: "https://github.com/dawidseipold",
  },
  {
    name: "LinkedIn",
    icon: <Icons.GitHub />,
    url: "https://github.com/dawidseipold",
  },
  {
    name: "Mail",
    icon: <Icons.GitHub />,
    url: "https://github.com/dawidseipold",
  },
]

const User = () => {
  const { theme, setTheme } = useTheme()

  // TODO: Obviously
  const user: any = {
    name: "John Doe",
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-10 w-10 rounded-xl">
          <AvatarImage src={user?.imageUrl} />

          <AvatarFallback className="text-sm font-bold text-neutral-300">
            {getFirstLetters(user.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel className="flex items-center gap-x-4">
          <Avatar className="h-10 w-10 rounded-xl">
            <AvatarImage src={user?.imageUrl} />

            <AvatarFallback className="text-sm font-bold text-neutral-300">
              {getFirstLetters(user.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex items-center gap-x-8">
            <div className="flex flex-col gap-y-2">
              <span className="font-bold text-white">John Doe</span>
              <span>johndoe@gmail.com</span>
            </div>

            <Badge>PRO</Badge>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>Home</DropdownMenuItem>
          <DropdownMenuItem>Browse</DropdownMenuItem>
          <DropdownMenuItem>Leaderboard</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light" className="flex gap-x-1">
            <Icons.Sun size={16} /> Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system" className="flex gap-x-1">
            <Icons.Sun size={16} />
            System
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" className="flex gap-x-1">
            <Icons.Moon size={16} />
            Dark
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Log Out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default User
