/* eslint-disable max-classes-per-file */
export class DefaultError extends Error {
  constructor() {
    super('Unknown error');
    this.name = 'DefaultError';
    this.message = 'Неизвестная ошибка, попробуйте позже';
  }
}

/**
 * HTTP 403 API limit.
 */
export class ApiLimitError extends Error {
  constructor() {
    super('API rate limit exceeded');
    this.name = 'ApiLimitError';
    this.message = 'Количество запросов превысило лимит, попробуйте через 10 минут';
  }
}

/**
 * HTTP 404 Not Found.
 */
export class NotFoundError extends Error {
  constructor() {
    super('Not found');
    this.name = 'NotFoundError';
    this.message = 'Запрос не найден';
  }
}

/**
 * HTTP 422 Validation.
 */
export class ValidationError extends Error {
  constructor() {
    super('Invalid format');
    this.name = 'ValidationError';
    this.message = 'Неверный формат данных';
  }
}

/**
 * HTTP 503 - Typically, when application is updated, restarted, etc.
 */
export class ServerUnavailable extends Error {
  constructor() {
    super('Server not working');
    this.name = 'ServerUnavailable';
    this.message = 'Сервера GitHub не работают, попробуйте позже';
  }
}
