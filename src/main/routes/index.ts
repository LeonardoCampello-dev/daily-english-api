import { Router } from 'express';

import { words } from './words';
import { phrases } from './phrases';
import { articles } from './articles';

const router = Router();

router.use('/words', words);
router.use('/phrases', phrases);
router.use('/articles', articles);

export { router };
