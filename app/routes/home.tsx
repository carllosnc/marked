import type { Route } from './+types/home'

import { HomeHeader } from '@/components/home/home-header'
import { HomeFooter } from '@/components/home/home-footer'
import { Illustration } from '@/components/illustration'
import { LogoSymbol } from '@/components/logo'
import { SiTypescript, SiReact, SiReactrouter, SiTurso } from 'react-icons/si'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Marked' }]
}

export default function Home() {
  return (
    <main className="page-bg">
      <HomeHeader />

      <div className="w-full m-auto max-w-[900px] flex flex-col gap-[50px] pt-[30px]">
        <div className="w-full px-6 flex flex-col gap-[20px] items-center justify-center">
          <LogoSymbol className="w-[60px] h-auto fill-black dark:fill-white" />

          <h1 className="md:text-[80px] md:leading-[70px] w-full max-w-[500px] text-[60px] leading-[50px] font-extrabold text-center">
            <span>Save</span> <br />
            <span>Manage</span> <br />
            <span>Share</span> <br />
          </h1>

          <p className="text-center text-color w-full text-[20px] md:text-md max-w-[600px]">
            Marked is a sleek, intuitive platform designed to help you
            effortlessly organize, manage, and share your favorite links.
          </p>
        </div>

        <hr className="border-color" />

        <div className="px-6 flex flex-col w-full items-center justify-center gap-[20px]">
          <p className="text-center text-[20px] max-w-[600px] text-color">
            This is a personal project that I'm developing for free. The main
            goal is to practice my frontend skills and solve some problems that
            I have in my daily life with my bookmarks.
          </p>

          <span className="text-color">
            The current stack for this project:
          </span>

          <div className="flex gap-[10px]">
            <SiReactrouter className="bg-white dark:bg-neutral-800 dark:shadow-none p-[14px] w-[50px] h-[50px] rounded-lg shadow text-neutral-400 dark:text-neutral-500" />
            <SiTypescript className="bg-white dark:bg-neutral-800 dark:shadow-none p-[14px] w-[50px] h-[50px] rounded-lg shadow text-neutral-400 dark:text-neutral-500" />
            <SiReact className="bg-white dark:bg-neutral-800 dark:shadow-none p-[14px] w-[50px] h-[50px] rounded-lg shadow text-neutral-400 dark:text-neutral-500" />
            <SiTurso className="bg-white dark:bg-neutral-800 dark:shadow-none p-[14px] w-[50px] h-[50px] rounded-lg shadow text-neutral-400 dark:text-neutral-500" />
          </div>
        </div>

        <Illustration className="w-full h-auto fill-neutral-300 dark:fill-neutral-800" />
      </div>

      <HomeFooter />
    </main>
  )
}
