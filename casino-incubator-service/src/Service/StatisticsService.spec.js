/* eslint "no-undef" : "off" */
import statisticsService from './StatisticsService';

describe('Statistics service', () => {
  it('should be a function', () => {
    const type = 'function';
    expect(typeof statisticsService.getTodayStats).toBe(type);
    expect(typeof statisticsService.getPeriodStats).toBe(type);
    expect(typeof statisticsService.createTodayStatObject).toBe(type);
    expect(typeof statisticsService.createPeriodObject).toBe(type);
  });

  it('should be return an object', () => {
    const type = 'object';
    expect(typeof statisticsService.createTodayStatObject()).toBe(type);
    expect(typeof statisticsService.createPeriodObject()).toBe(type);
  });
});
