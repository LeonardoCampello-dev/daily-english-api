import { Router } from 'express'

import { words } from 'main/routes/words'
import { phrases } from 'main/routes/phrases'
import { articles } from 'main/routes/articles'
import { podcasts } from 'main/routes/podcasts'
import { songs } from 'main/routes/songs'

const router = Router()

router.use('/words', words)
router.use('/phrases', phrases)
router.use('/articles', articles)
router.use('/podcasts', podcasts)
router.use('/songs', songs)

export { router }
