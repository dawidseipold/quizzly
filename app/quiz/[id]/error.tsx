"use client"

import { FC } from "react"

interface ErrorProps {
  error: Error
  reset: () => void
}

const Error: FC<ErrorProps> = ({ error, reset }) => {
  return <div>{error.message}</div>
}

export default Error
