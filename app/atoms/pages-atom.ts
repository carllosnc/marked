import type { Page } from '@/types/db-types'
import { atom } from 'jotai'

export const pagesAtom = atom<Page[]>([])
