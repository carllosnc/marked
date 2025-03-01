import { useSignIn } from '@clerk/clerk-react'
import { Button } from './ui/button'
import { FcGoogle } from 'react-icons/fc'
import { Spinner } from './ui/spinner'

export function GoogleSignIn() {
  const { signIn, isLoaded } = useSignIn()

  const handleGoogleSignIn = () => {
    signIn?.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/dashboard',
    })
  }

  if (!isLoaded) {
    return <Spinner />
  }

  return (
    <div>
      <Button variant="outline" onClick={handleGoogleSignIn}>
        <FcGoogle />
        <span>Sign in with Google</span>
      </Button>
    </div>
  )
}
