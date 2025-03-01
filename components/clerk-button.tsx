import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/react-router'

export function ClerkButton() {
  return (
    <div className="flex justify-center items-center">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}
