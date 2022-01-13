import { Router } from 'express';

import { words } from './words';

const router = Router();

router.use('/words', words);

export { router };
