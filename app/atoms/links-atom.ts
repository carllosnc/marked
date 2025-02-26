import type { Link } from '@/types/db-types'
import { atom } from 'jotai'

export const linksAtom = atom<Link[]>([])
