import store from '../store';
import http from './http';
import config from '../mocks/config';

export default {
  getConfig() {
    return http.get('config');
  },
  updateConfig(data) {
    return http.put('config/update', data, {
      headers: {
        Authorization: `Bearer ${store.getters.accessToken}`,
      },
    });
  },
  getConfigMock() {
    return new Promise((resolve) => {
      resolve(
        config,
      );
    });
  },
};
