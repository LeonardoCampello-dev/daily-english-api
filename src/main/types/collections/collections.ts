export type Collections = 'articles' | 'podcasts' | 'sentences' | 'songs' | 'words'

export type CollectionIndexes =
  | 'word_by_id'
  | 'song_by_id'
  | 'phrase_by_id'
  | 'podcast_by_id'
  | 'article_by_id'

export enum CollectionIndexesEnum {
  WORD_BY_ID = 'word_by_id',
  SONG_BY_ID = 'song_by_id',
  PHRASE_BY_ID = 'phrase_by_id',
  PODCAST_BY_ID = 'podcast_by_id',
  ARTICLE_BY_ID = 'article_by_id'
}
