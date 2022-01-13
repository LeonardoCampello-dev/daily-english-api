import { Router } from 'express';

import { words } from './words';
import { phrases } from './phrases';
import { articles } from './articles';
import { podcasts } from './podcasts';
import { songs } from './song';

const router = Router();

router.use('/words', words);
router.use('/phrases', phrases);
router.use('/articles', articles);
router.use('/podcasts', podcasts);
router.use('/songs', songs);

export { router };
