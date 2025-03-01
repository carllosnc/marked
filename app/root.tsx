import { rootAuthLoader } from '@clerk/react-router/ssr.server'
import {
  isRouteErrorResponse,
  Meta,
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
  NavLink,
} from 'react-router'
import type { Route } from './+types/root'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './app.css'
import { Toaster } from '@/components/ui/sonner'
import { LogoHorizontal } from '@/components/logo'

const queryClient = new QueryClient()

export async function loader(args: Route.LoaderArgs) {
  return rootAuthLoader(args)
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Toaster />
      </body>
    </html>
  )
}

export default function App({ loaderData }: Route.ComponentProps) {
  return (
    <ClerkProvider
      loaderData={loaderData}
      signUpFallbackRedirectUrl="/"
      signInFallbackRedirectUrl="/dashboard"
    >
      <QueryClientProvider client={queryClient}>
        <main>
          <Outlet />
        </main>
      </QueryClientProvider>
    </ClerkProvider>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="w-full p-[20px] page-bg min-h-screen flex flex-col justify-center items-center">
      <LogoHorizontal className="fill-neutral-300 w-full max-w-[200px] h-auto dark:fill-neutral-700" />

      <h1 className="title-color text-[100px] font-black">{message}</h1>

      <div className="flex flex-col gap-[20px] items-center justify-center">
        <p className="text-color text-[18px] text-center">{details}</p>
        {stack && (
          <pre className="">
            <code>{stack}</code>
          </pre>
        )}
        <NavLink to="/" className="link-color hover:underline">
          Back to home →
        </NavLink>
      </div>
    </main>
  )
}
