import store from '../store';
import http from './http';
import todayRatings from '../mocks/todayRatings';
import periodRatings from '../mocks/periodRatings';

export default {
  getTodayReport(params) {
    return http.get('statistics/today/', {
      params: {
        tzOffset: params.tzOffset,
      },
      headers: {
        Authorization: `Bearer ${store.getters.accessToken}`,
      },
    });
  },
  getPeriodReport(params) {
    return http.get('statistics/period', {
      params: {
        dateFrom: params.dateFrom,
        dateTo: params.dateTo,
        tzOffset: params.tzOffset,
      },
      headers: {
        Authorization: `Bearer ${store.getters.accessToken}`,
      },
    });
  },
  getTodayReportMock() {
    return new Promise((resolve) => {
      resolve(
        todayRatings,
      );
    });
  },
  getPeriodReportMock() {
    return new Promise((resolve) => {
      resolve(
        periodRatings,
      );
    });
  },
};
