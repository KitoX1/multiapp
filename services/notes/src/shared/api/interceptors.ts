import { AxiosResponse, isCancel } from 'axios';

import { DefaultError, NotFoundError, ServerUnavailable, ValidationError, ApiLimitError } from './exceptions';

export function responseInterceptorSuccess(success: AxiosResponse) {
  return success;
}

export function responseInterceptorError(error: any) {
  const { response } = error;

  if (isCancel(error)) return Promise.reject(new Error('CANCELED'));

  if (!response) return Promise.reject(new DefaultError());

  let customError;

  switch (response.status) {
    case 403:
      customError = new ApiLimitError();
      break;
    case 404:
      customError = new NotFoundError();
      break;
    case 422:
      customError = new ValidationError();
      break;
    case 503:
      customError = new ServerUnavailable();
      break;
    default:
      customError = new DefaultError();
  }

  return Promise.reject(customError);
}
