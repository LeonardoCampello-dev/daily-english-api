export type CollectionIndexes =
  | 'word_by_id'
  | 'song_by_id'
  | 'phrase_by_id'
  | 'podcast_by_id'
  | 'article_by_id';

export enum CollectionIndexesEnum {
  wordById = 'word_by_id',
  songById = 'song_by_id',
  phraseById = 'phrase_by_id',
  podcastById = 'podcast_by_id',
  articleById = 'article_by_id'
}
