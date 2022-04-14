import {
  BadRequestError,
  InstanceNotFoundError,
  InstanceNotUniqueError,
  PermissionDeniedError,
  ServerError,
  UnauthorizedError
} from 'application/errors'

import { HttpStatusCode } from 'main/types'

export class ErrorHandler {
  constructor() {}

  handle(code: HttpStatusCode, description?: string) {
    switch (code) {
      case HttpStatusCode.badRequest: {
        return { status: HttpStatusCode.badRequest, error: new BadRequestError(), description }
      }

      case HttpStatusCode.unauthorized: {
        return { status: HttpStatusCode.unauthorized, error: new UnauthorizedError(), description }
      }

      case HttpStatusCode.forbidden: {
        return {
          status: HttpStatusCode.forbidden,
          error: new PermissionDeniedError(),
          description
        }
      }

      case HttpStatusCode.notFound: {
        return { status: HttpStatusCode.notFound, error: new InstanceNotFoundError(), description }
      }

      case HttpStatusCode.conflict: {
        return {
          status: HttpStatusCode.conflict,
          error: new InstanceNotUniqueError(),
          description
        }
      }

      default: {
        return { status: HttpStatusCode.serverError, error: new ServerError(), description }
      }
    }
  }
}
