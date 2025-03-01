import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/react-router'
import { Button } from './ui/button'

export function ClerkButton() {
  return (
    <div className="flex justify-center items-center">
      <SignedOut>
        <Button>
          <SignInButton />
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}
