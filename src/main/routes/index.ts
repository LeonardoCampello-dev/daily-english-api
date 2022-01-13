import { Router } from 'express';

import { words } from './words';
import { phrases } from './phrases';

const router = Router();

router.use('/words', words);
router.use('/phrases', phrases);

export { router };
