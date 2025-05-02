import type { Link } from '@/types/db-types'
import { useEffect, useRef } from 'react'

type props = {
  tiny: boolean
  link: Link
}

export function LinksLinkCard({ link, tiny }: props) {
  const imageRef = useRef<HTMLImageElement>(null)

  function getFavicon(url: string) {
    const host = new URL(url).hostname

    return `https://icons.duckduckgo.com/ip3/${host}.ico`
  }

  function checkRatio() {
    if (imageRef.current) {
      imageRef.current!.onload = () => {
        const imageWidth = imageRef.current!.naturalWidth

        if (imageWidth !== 0) {
          imageRef.current!.classList.remove('hidden')
          imageRef.current!.classList.add('fade-in')

          switch (true) {
            case imageWidth <= 60:
              imageRef.current!.classList.add('display-none')
            case imageWidth <= 100:
              imageRef.current!.classList.add('width-100')
              break
            case imageWidth <= 200:
              imageRef.current!.classList.add('width-200')
              break
            case imageWidth <= 300:
              imageRef.current!.classList.add('width-300')
              break
          }
        }
      }
    }
  }

  useEffect(() => {
    checkRatio()
  }, [imageRef, tiny])

  function getHost(url: string) {
    const host = new URL(url).hostname

    return host
  }

  return (
    <a
      className="card-block card-linkable flex flex-col gap-[10px]"
      href={link.url!}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex gap-[10px] items-center">
        <img
          src={getFavicon(link.url!)}
          alt="favicon"
          className="w-[15px] h-[15px] min-w-[20px] min-h-[20px]"
        />
        <span className="link-color">{getHost(link.url!)}</span>
      </div>

      <span className="title-color break-all"> {link.title!} </span>

      {!tiny && (
        <img
          ref={imageRef}
          alt={link.title!}
          src={link.image!}
          className="w-full bg-white hidden border border-color"
        />
      )}

      {!tiny && <span className="text-color">{link.description}</span>}
    </a>
  )
}
