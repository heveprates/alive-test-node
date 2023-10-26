export class NoDataFoundError extends Error {
  constructor() {
    super('No data found');
  }
}
