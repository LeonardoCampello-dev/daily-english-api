import { DateRecords } from '@/main/types';

interface Entity {
  id: string;

  phrase: string;
  translation: string;

  note?: string;

  associatedWords?: string[];

  deleted: boolean;
}

export type Phrase = Entity & DateRecords;
