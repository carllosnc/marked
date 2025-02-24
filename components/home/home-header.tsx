import { UserButton } from "@/components/user-button";
import { LogoHorizontal } from "../logo";

export function HomeHeader() {
  return (
    <nav className="border-b border-color px-6">
      <div className="w-full m-auto flex justify-between items-center max-w-[900px] h-[70px]">
        <LogoHorizontal className="w-[120px] h-auto fill-neutral-950 dark:fill-white" />

        <UserButton />
      </div>
    </nav>
  )
}