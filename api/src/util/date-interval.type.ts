import { InvalidDateStringError } from './errors/invalid-datestring.error';
import { InvalidIntervalError } from './errors/invalid-interval.error';
import { formatDate } from './format-date';

export type DateString = string;

export class DateInterval {
  public readonly to: DateString;
  public readonly from: DateString;
  constructor(from: Date, to: Date) {
    if (from.getTime() > to.getTime()) {
      throw new InvalidIntervalError(from, to);
    }

    this.from = DateInterval.validateDateString(from);
    this.to = DateInterval.validateDateString(to);
  }

  public static validateDateString(date: Date): DateString {
    const dateString = formatDate(date);
    if (dateString !== date.toISOString().slice(0, 10)) {
      throw new InvalidDateStringError(date);
    }
    return dateString;
  }

  public isDateInsideInterval(date: DateString): boolean {
    return this.from <= date && date <= this.to;
  }
}
