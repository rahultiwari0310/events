import { checkTimeOverlaps } from "../checkTimeOverlap";

describe('checkTimeOverlaps', () => {
  test('should return true when time ranges overlap', () => {
    expect(checkTimeOverlaps({
      start_time: '2022-12-17 13:00:01', end_time: '2022-12-17 13:00:00'
    }, {
      start_time: '2022-12-17 10:00:00', end_time: '2022-12-17 12:00:00'
    })).toBe(false);

    expect(checkTimeOverlaps({
      start_time: '2022-12-17 13:00:00', end_time: '2022-12-17 17:00:00'
    }, {
      start_time: '2022-12-17 13:00:00', end_time: '2022-12-17 15:00:00'
    })).toBe(true);

    expect(checkTimeOverlaps({
      start_time: '2022-12-17 13:00:00', end_time: '2022-12-17 17:00:00'
    }, {
      start_time: '2022-12-17 14:00:00', end_time: '2022-12-17 15:00:00'
    })).toBe(true);

    expect(checkTimeOverlaps({
      start_time: '2022-13-17 13:00:00', end_time: '2022-13-17 17:00:00'
    }, {
      start_time: '2022-12-17 14:00:00', end_time: '2022-12-17 15:00:00'
    })).toBe(false);

    expect(checkTimeOverlaps({
      start_time: '2022-12-17 13:00:00', end_time: '2022-12-17 14:00:00'
    }, {
      start_time: '2022-12-17 13:10:00', end_time: '2022-12-17 13:15:00'
    })).toBe(true);

  });
});