import "../index.css"

import { useState } from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRootRoute, Link, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

export const Route = createRootRoute({
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [queryClient] = useState(
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 3,
            staleTime: 5 * 60 * 1000, // 5 minutes
          },
        },
      })
    )
    return (
      <>
        <header className='p-4 bg-indigo-600 text-white shadow-md'>
          <div className='container mx-auto flex justify-between items-center'>
            <h1 className='text-xl font-bold'>Student Management System</h1>
          </div>
        </header>
        <QueryClientProvider client={queryClient}>
          <main className='container mx-auto mt-6 pb-10'>
            <Outlet />
          </main>
          <TanStackRouterDevtools />
        </QueryClientProvider>
      </>
    )
  },
})
