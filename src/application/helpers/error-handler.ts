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

  handle(code: HttpStatusCode) {
    switch (code) {
      case 409: {
        return { status: 409, error: new InstanceNotUniqueError() };
      }

      case 401: {
        return { status: 401, error: new UnauthorizedError() };
      }

      case 404: {
        return { status: 404, error: new InstanceNotFoundError() };
      }

      case 403: {
        return { status: 403, error: new PermissionDeniedError() };
      }

      default: {
        return { status: 500, error: new ServerError() };
      }
    }
  }
}
