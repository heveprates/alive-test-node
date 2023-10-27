import { DateInterval } from './date-interval.type';
import { InvalidDateStringError } from './errors/invalid-datestring.error';
import { InvalidIntervalError } from './errors/invalid-interval.error';

describe('DateInterval', () => {
  describe('constructor', () => {
    it('should create a valid interval', () => {
      const from = new Date('2021-10-01');
      const to = new Date('2021-10-31');
      const interval = new DateInterval(from, to);
      expect(interval.from).toEqual('2021-10-01');
      expect(interval.to).toEqual('2021-10-31');
    });

    it('should throw an error if from is greater than to', () => {
      const from = new Date('2021-10-31');
      const to = new Date('2021-10-01');
      expect(() => new DateInterval(from, to)).toThrow(InvalidIntervalError);
    });

    it('should throw an error if from date is not a valid date string', () => {
      const from = new Date('2021-10-01TA0:00:00.000Z');
      const to = new Date('2021-10-31');
      expect(() => new DateInterval(from, to)).toThrow(InvalidDateStringError);
    });

    it('should throw an error if to date is not a valid date string', () => {
      const from = new Date('2021-10-01');
      const to = new Date('2021-10-31TA0:00:00.000Z');
      expect(() => new DateInterval(from, to)).toThrow(InvalidDateStringError);
    });
  });

  describe('isDateInsideInterval', () => {
    it('should return true if date is inside the interval', () => {
      const from = new Date('2021-10-01');
      const to = new Date('2021-10-31');
      const interval = new DateInterval(from, to);
      const date = '2021-10-15';
      expect(interval.isDateInsideInterval(date)).toBe(true);
    });

    it('should return false if date is outside the interval', () => {
      const from = new Date('2021-10-01');
      const to = new Date('2021-10-31');
      const interval = new DateInterval(from, to);
      const date = '2021-11-01';
      expect(interval.isDateInsideInterval(date)).toBe(false);
    });

    it('should return true if date is equal to from', () => {
      const from = new Date('2021-10-01');
      const to = new Date('2021-10-31');
      const interval = new DateInterval(from, to);
      const date = '2021-10-01';
      expect(interval.isDateInsideInterval(date)).toBe(true);
    });

    it('should return true if date is equal to to', () => {
      const from = new Date('2021-10-01');
      const to = new Date('2021-10-31');
      const interval = new DateInterval(from, to);
      const date = '2021-10-31';
      expect(interval.isDateInsideInterval(date)).toBe(true);
    });
  });
});
