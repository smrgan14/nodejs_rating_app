import {
  map,
  filter,
  property,
  isNumber,
  concat,
  compact,
  find,
  each,
  uniq,
  sortBy,
  groupBy,
  sumBy,
  slice,
} from 'lodash';
import JwtDecode from 'jwt-decode';
import config from '../api/config';
import rating from '../api/rating';
import report from '../api/report';
import google from '../api/google';
import { moment } from '../utility';
import router from '../router';

export default {
  async getConfiguration({ commit, dispatch }) {
    const response = await config.getConfig();
    commit('setConfig', response.data.config);
    dispatch('addEmotionsList', Number(response.data.config.numberOfEmotions));
    // Uncomment for mock data
    // const response = await config.getConfigMock();
    // commit('setConfig', response.config);
    // dispatch('addEmotionsListOnLoad', response.config.numberOfEmotions);
  },
  updateConfigState({ commit, dispatch }, data) {
    if (data.config) {
      dispatch('addEmotionsList', data.config.numberOfEmotions);
      commit('setRatingMessage', data.config.ratingMessage);
      commit('setMessageTimeOut', data.config.messageTimeOut);
    }
  },
  updateEmotionList({ dispatch }, number) {
    if (number) {
      dispatch('addEmotionsList', number);
    }
  },
  async updateConfig(context, data) {
    try {
      await config.updateConfig(data);
    } catch (error) {
      console.log(error);
    }
  },
  async getGoogleAccesToken({ commit, getters }, authCode) {
    try {
      const response = await google.sendGoogleAuthCode(authCode);
      localStorage.setItem('accessToken', response.data.access_token);
      commit('setAccessToken', response.data.access_token);
      const token = JwtDecode(response.data.access_token);
      commit('setUserInfo', {
        fullName: token.name,
        company: token.hd,
        profilePicture: token.picture,
      });
      if (getters.accessToken) {
        router.push('sidebar');
      } else {
        router.push('login');
      }
    } catch (error) {
      console.log(error);
    }
  },
  logOut({ commit }) {
    localStorage.removeItem('accessToken');
    commit('setAccessToken', null);
    router.push('login');
  },
  async registerEmotion({ commit, getters }, data) {
    try {
      commit('setErrorMessage', getters.translations.serverErrorMesage);
      const response = await rating.registerEmotion(data);
      if (response) {
        commit('setErrorMessage', null);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getRatingsReport({ dispatch }, params) {
    let response = null;
    let ratings = null;
    let lineChartLabels = null;
    const timeZoneOffset = moment().utcOffset() / 60;
    const tzOffset = { tzOffset: timeZoneOffset };
    if (params) {
      response = await report.getPeriodReport(params);
      ratings = response.data.reportRatings;
      // Uncomment for mock data
      // response = await report.getPeriodReportMock(params);
      // ratings = response.reportRatings;
      lineChartLabels = map(ratings, item => moment(item.date).format('ddd'));
    } else {
      response = await report.getTodayReport(tzOffset);
      ratings = response.data.todayRatings;
      // Uncomment for mock data
      // response = await report.getTodayReportMock();
      // ratings = response.todayRatings;
      lineChartLabels = map(ratings, item => moment(item.hour, 'HH').format('HH:mm'));
      // .filter((item, index) => index % 2 === 0);
    }
    let tempArray = [];
    const mapedTodayRatings = map(ratings, property('emotions'));
    each(mapedTodayRatings, (item) => {
      tempArray = concat(compact(tempArray), item);
    });
    const emotionsIds = sortBy(uniq(map(tempArray, property('id'))), item => item);
    const sortData = sortBy(tempArray, x => x.id);
    const groupData = groupBy(sortData, x => x.name);
    // setting data for table, pie and line chart
    dispatch('setTableData', groupData);
    dispatch('setPieChartData', { emotions: emotionsIds, chartData: groupData });
    dispatch('setLineChartData', { emotions: emotionsIds, chartData: mapedTodayRatings, labels: lineChartLabels });
  },
  setTableData({ commit }, data) {
    let tableData = [];
    tableData = map(data, (item, index) => ({
      name: index,
      count: sumBy(item, x => x.count),
    }));
    commit('setEmotionsTableData', tableData);
  },
  setPieChartData({ commit, getters }, data) {
    const pieChartData = { labels: [], datasets: [] };
    let tempColor = [];
    let tempData = [];
    tempData = map(data.chartData, (item, index) => ({
      name: index,
      count: sumBy(item, x => x.count),
    }));
    each(data.emotions, (item) => {
      const emoji = find(getters.emotionsSettings, emotion => emotion.id === item);
      tempColor = concat(tempColor, emoji.chartColor);
      pieChartData.labels = concat(pieChartData.labels, emoji.status);
    });
    const pieChartDataSet = {
      backgroundColor: tempColor, data: map(tempData, property('count')), borderWidth: 3, borderColor: '#2D3038',
    };
    pieChartData.datasets = concat(pieChartData.datasets, pieChartDataSet);
    commit('setEmotionsPieChartData', pieChartData);
  },
  setLineChartData({ commit, getters }, data) {
    const lineChartData = { labels: [], datasets: [] };
    let tempData = [];
    each(data.emotions, (item) => {
      const setting = find(getters.emotionsSettings, emotion => emotion.id === item);
      const lineChartDataSet = {
        label: setting.status, borderColor: setting.chartColor, borderWidth: 1, pointBorderColor: 'white', data: [],
      };
      lineChartData.datasets = concat(lineChartData.datasets, lineChartDataSet);
    });
    each(lineChartData.datasets, (chartItem) => {
      map(data.chartData, (item) => {
        let ratingItem = map(item, rate => (rate.name === chartItem.label ? rate.count : 0));
        ratingItem = uniq(ratingItem);
        if (ratingItem.length > 1) {
          ratingItem = filter(ratingItem, number => number > 0);
        }
        tempData = concat(tempData, ratingItem);
      });
      const chart = chartItem;
      chart.data = tempData;
      tempData = [];
    });
    lineChartData.labels = data.labels;
    commit('setEmotionsLineChartData', lineChartData);
  },
  addRatingMessage({ commit }, message) {
    if (message) {
      commit('setRatingMessage', message);
    }
  },
  addMessageTimeOut({ commit }, timeOut) {
    if (timeOut && isNumber(timeOut)) {
      commit('setMessageTimeOut', timeOut * 1000);
    }
  },
  addNumberOfEmotions({ commit }, number) {
    if (number && isNumber(number)) {
      commit('setNumberOfEmotions', number);
    }
  },
  addEmotionsList({ commit, getters }, emotionsNumber) {
    const emotionsTemp = slice(getters.emotionsSettings, 0, emotionsNumber);
    commit('setFilteredEmotions', emotionsTemp);
    commit('setNumberOfEmotions', emotionsNumber);
  },
};
