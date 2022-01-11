type Tense = 'present' | 'past' | 'future' | 'continuous' | 'perfect'

interface Word {
  id: string

  word: string
  translation: string

  created_at: string
  updated_at: string
  deleted_at: string

  note: string

  tense: Tense
}
