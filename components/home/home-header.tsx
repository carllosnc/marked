import { LogoHorizontal } from '../logo'
import { Button } from '@/components/ui/button'
import { NavLink, useNavigation } from 'react-router'
import { useUser } from '@clerk/react-router'
import { ClerkButton } from '../clerk-button'
import { Spinner } from '@/components/ui/spinner'

export function HomeHeader() {
  const { user, isLoaded } = useUser()
  const navigation = useNavigation()
  const isNavigating = Boolean(navigation.location)

  return (
    <nav className="border-b border-color px-6">
      <div className="w-full m-auto flex justify-between items-center max-w-[900px] h-[70px]">
        <LogoHorizontal className="w-[120px] h-auto fill-neutral-950 dark:fill-white" />

        <div className="flex gap-[20px]">
          {isLoaded && user?.firstName && (
            <NavLink to="/dashboard">
              <Button size="sm" variant="outline">
                Dashboard {isNavigating && <Spinner />}
              </Button>
            </NavLink>
          )}
          <ClerkButton />
        </div>
      </div>
    </nav>
  )
}
