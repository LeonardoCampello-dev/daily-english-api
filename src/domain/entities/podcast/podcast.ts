import { DateRecords } from 'main/types'

interface Entity {
  id: string

  title: string
  url: string

  note?: string

  subject: string

  keywords?: string[]

  deleted: boolean
}

export type Podcast = Entity & DateRecords
