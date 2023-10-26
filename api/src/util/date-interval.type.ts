import { formatDate } from './format-date';

export type DateString = string;

export class DateInterval {
  constructor(
    public readonly to: DateString,
    public readonly from: DateString,
  ) {
    if (from > to) {
      throw new Error('Invalid interval');
    }
    if (!DateInterval.validateDateString(from)) {
      throw new Error('Invalid from date');
    }
    if (!DateInterval.validateDateString(to)) {
      throw new Error('Invalid to date');
    }
  }

  public static validateDateString(input: string): DateString {
    const date = new Date(input + 'T00:00:00Z');
    const dateString = formatDate(date);
    if (dateString !== input) {
      throw new Error('Invalid date string');
    }
    return dateString;
  }

  public isDateInsideInterval(date: DateString): boolean {
    return this.from <= date && date <= this.to;
  }
}
