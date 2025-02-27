import { UserButton } from '@/components/user-button'
import { LogoHorizontal } from '../logo'
import { Button } from '@/components/ui/button'
import { NavLink } from 'react-router'
import { useUser } from '@clerk/react-router'

export function HomeHeader() {
  const { user, isLoaded } = useUser()

  return (
    <nav className="border-b border-color px-6">
      <div className="w-full m-auto flex justify-between items-center max-w-[900px] h-[70px]">
        <LogoHorizontal className="w-[120px] h-auto fill-neutral-950 dark:fill-white" />

        <div className="flex gap-[20px]">
          {isLoaded && user?.firstName && (
            <NavLink to="/dashboard">
              <Button size="sm" variant="outline">
                Dashboard
              </Button>
            </NavLink>
          )}
          <UserButton />
        </div>
      </div>
    </nav>
  )
}
