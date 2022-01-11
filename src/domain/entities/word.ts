import { DateRecords, Tense } from '@/main/types';

interface Entity {
  id: string;

  word: string;
  translation: string;

  note: string;

  tense: Tense;
}

export type Word = DateRecords & Entity;
