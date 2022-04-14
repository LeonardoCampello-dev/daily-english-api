import { Crud, ErrorHandler } from 'application/helpers'
import { ValidateRequestBody } from 'application/validation'
import { songPostRequestSchema, songPutRequestSchema } from 'application/validation/schemas'

import { Song } from 'domain/entities'
import { Router, Request, Response } from 'express'

import { faunaClient } from 'main/config/fauna-client'
import { CollectionIndexesEnum, HttpStatusCode } from 'main/types'

const router = Router()
const crudService = new Crud<Song>('songs', CollectionIndexesEnum.SONG_BY_ID, faunaClient)
const errorHandler = new ErrorHandler()

type Body = Omit<Song, 'id'>

router.get('/', async (request: Request, response: Response) => {
  try {
    const result = await crudService.getAll<Song>()

    response.json(result)
  } catch (error) {
    console.error(error)

    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description)

    response.status(formattedError.status).json(formattedError)
  }
})

router.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params

    if (!id) {
      const formattedError = errorHandler.handle(HttpStatusCode.badRequest, 'id is required.')

      response.status(formattedError.status).json(formattedError)
    }

    const result = await crudService.get<Song>(id)

    response.json(result)
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description)

    response.status(formattedError.status).json(formattedError)
  }
})

router.post('/', async (request: Request, response: Response) => {
  try {
    const { body } = request

    const validate = ValidateRequestBody<Body>(songPostRequestSchema, body)

    if (validate.error) {
      const formattedError = errorHandler.handle(HttpStatusCode.badRequest, validate.error.message)

      response.status(formattedError.status).json(formattedError)
    }

    const result = await crudService.create<Body, Song>(body)

    response.json(result)
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description)

    response.status(formattedError.status).json(formattedError)
  }
})

router.put('/:id', async (request: Request, response: Response) => {
  try {
    const {
      body,
      params: { id }
    } = request

    const validate = ValidateRequestBody<Body>(songPutRequestSchema, body)

    if (validate.error || !id) {
      const formattedError = errorHandler.handle(
        HttpStatusCode.badRequest,
        validate.error.message || 'id is required'
      )

      response.status(formattedError.status).json(formattedError)
    }

    const result = await crudService.update<Body, Song>(id, body)

    response.json(result)
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description)

    response.status(formattedError.status).json(formattedError)
  }
})

router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params

    if (!id) {
      const formattedError = errorHandler.handle(HttpStatusCode.badRequest, 'id is required.')

      response.status(formattedError.status).json(formattedError)
    }

    const result = await crudService.delete<Song>(id)

    response.json(result)
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description)

    response.status(formattedError.status).json(formattedError)
  }
})

export { router as songs }
