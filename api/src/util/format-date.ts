import { DateString } from './date-interval.type';

export function formatDate(date: Date): DateString {
  return date.toISOString().slice(0, 10);
}
