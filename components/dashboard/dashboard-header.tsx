import { LogoHorizontal } from '@/components/logo'
import { ClerkButton } from '../clerk-button'
import { NavLink } from 'react-router'
import { Button } from '../ui/button'

export function DashboardHeader() {
  return (
    <nav className="border-b border-color px-6">
      <div className="w-full m-auto flex justify-between items-center max-w-[900px] h-[70px]">
        <LogoHorizontal className="w-[120px] h-auto fill-neutral-950 dark:fill-white" />

        <div className="flex gap-[20px]">
          <NavLink to="/">
            <Button size="sm" variant="outline">
              Home
            </Button>
          </NavLink>
          <ClerkButton />
        </div>
      </div>
    </nav>
  )
}
