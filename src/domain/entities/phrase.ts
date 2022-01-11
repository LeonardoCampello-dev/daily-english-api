import { DateRecords } from '@/main/types';

interface Entity {
  id: string;

  phrase: string;
  translation: string;

  note: string;

  associatedWords: string[];
}

export type Phrase = Entity & DateRecords;
