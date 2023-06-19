"use client"

import { FC } from "react"
import Link from "next/link"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { Icons } from "./icons"

const logoVariants = cva("flex font-bold items-center", {
  variants: {
    size: {
      default: "text-xl gap-x-1.5",
      small: "text-lg gap-x-1",
      large: "text-2xl gap-x-2",
    },
  },
})

export interface LogoProps extends VariantProps<typeof logoVariants> {
  className?: string
}

const Logo: FC<LogoProps> = ({ className, size }) => {
  function setIconSize() {
    switch (size) {
      case "default":
        return 36

      case "small":
        return 24

      case "large":
        return 48
    }
  }

  return (
    <Link href="/" className={cn(logoVariants({ className, size }))}>
      <Icons.Dog size={setIconSize()} />

      <span className={cn(logoVariants({}))}>Quizzly</span>
    </Link>
  )
}

export default Logo
