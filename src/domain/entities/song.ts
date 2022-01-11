import { DateRecords } from '@/main/types';

interface Entity {
  id: string;

  title: string;
  author: string;

  url: string;

  note: string;
  subject: string;

  keywords: string[];
}

export type Song = Entity & DateRecords;
