export class ApplicationException extends Error {
  constructor(message = 'An unexpected application error ocurred.') {
    super(message);
  }
}
