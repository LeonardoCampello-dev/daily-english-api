import { DateRecords, Tense } from '@/main/types';

interface Entity {
  id: string;

  word: string;
  translation: string;

  note: string;

  tense: Tense;

  deleted: boolean;
}

export type Word = Entity & DateRecords;
