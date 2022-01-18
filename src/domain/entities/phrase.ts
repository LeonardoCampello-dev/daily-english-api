import { DateRecords, Tense } from '@/main/types';

interface Entity {
  id: string;

  phrase: string;
  translation: string;

  note?: string;

  tense?: Tense;

  associatedWords?: string[];

  deleted: boolean;
}

export type Phrase = Entity & DateRecords;
