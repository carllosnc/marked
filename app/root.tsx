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
        <Links />

        <title>Marked | Save Your Favorites</title>

        <meta
          name="description"
          content="Marked helps you save and organize all your favorite websites, articles, videos, and more in one beautiful place."
        />
        <meta
          name="keywords"
          content="bookmarks, favorites, save links, bookmark manager, read later, web app"
        />
        <meta name="author" content="Carlos Costa" />

        <meta name="theme-color" content="#ffffff" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marked-links.vercel.app/" />
        <meta
          property="og:title"
          content="Marked | The Modern Way to Save Favorites"
        />
        <meta
          property="og:description"
          content="Save, organize and discover your favorite content from around the web, all in one beautiful place."
        />
        <meta property="og:image" content="/og.webp" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://marked-links.vercel.app/"
        />
        <meta
          property="twitter:title"
          content="Marked | The Modern Way to Save Favorites"
        />
        <meta
          property="twitter:description"
          content="Save, organize and discover your favorite content from around the web, all in one beautiful place."
        />
        <meta property="twitter:image" content="/og.webp" />

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

        <Meta />
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
