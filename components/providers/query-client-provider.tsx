"use client"

import { FC, ReactNode, useState } from "react"
import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from "@tanstack/react-query"

interface QueryClientProviderProps {
  children: ReactNode
}

const QueryClientProvider: FC<QueryClientProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  )
}

export default QueryClientProvider
