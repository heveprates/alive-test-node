export class InvalidIntervalError extends Error {
  constructor(
    readonly dateFrom: Date,
    readonly dateTo: Date,
  ) {
    super('Invalid interval');
  }
}
