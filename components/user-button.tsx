import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { useUser, useClerk } from '@clerk/react-router'
import { LuLogOut, LuLayoutDashboard, LuHouse } from 'react-icons/lu'
import { useNavigate, NavLink } from 'react-router'
import { Spinner } from '@/components/ui/spinner'

export function UserButton() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/sign-in')
  }

  if (!isLoaded) {
    return <Spinner />
  }

  return (
    <div className="flex justify-center items-center">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="w-8 h-8 rounded-full">
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback>{user.firstName?.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel> {user.firstName} </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <NavLink to="/">
              <DropdownMenuItem className="flex gap-[10px] items-center">
                <LuHouse />
                <span>Home</span>
              </DropdownMenuItem>
            </NavLink>

            <NavLink to="/dashboard" state={{ foo: 'foo', bar: 'bar' }}>
              <DropdownMenuItem className="cursor-pointer flex gap-[10px] items-center">
                <LuLayoutDashboard />
                Dashboard
              </DropdownMenuItem>
            </NavLink>

            <DropdownMenuItem
              className="text-red-500 flex gap-[10px] items-center"
              onClick={handleSignOut}
            >
              <LuLogOut />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <NavLink to="/sign-in">
          <Button size="sm" variant="outline" className="cursor-pointer">
            Sign in
          </Button>
        </NavLink>
      )}
    </div>
  )
}
