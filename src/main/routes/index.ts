import { Router } from 'express';

import { words } from './words';
import { phrases } from './phrases';
import { articles } from './articles';
import { podcasts } from './podcasts';

const router = Router();

router.use('/words', words);
router.use('/phrases', phrases);
router.use('/articles', articles);
router.use('/podcasts', podcasts);

export { router };
