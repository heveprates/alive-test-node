export class InvalidDateStringError extends Error {
  constructor(readonly date: Date) {
    super('Invalid date string');
  }
}
