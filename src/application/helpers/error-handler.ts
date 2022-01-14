import { HttpStatusCode } from '../../main/types';

import {
  InstanceNotFoundError,
  InstanceNotUniqueError,
  PermissionDeniedError,
  ServerError,
  UnauthorizedError
} from '../errors';

export class ErrorHandler {
  constructor() {}

  handle(code: HttpStatusCode, description?: string) {
    switch (code) {
      case 409: {
        return { status: 409, error: new InstanceNotUniqueError(), description };
      }

      case 401: {
        return { status: 401, error: new UnauthorizedError(), description };
      }

      case 404: {
        return { status: 404, error: new InstanceNotFoundError(), description };
      }

      case 403: {
        return { status: 403, error: new PermissionDeniedError(), description };
      }

      default: {
        return { status: 500, error: new ServerError(), description };
      }
    }
  }
}
