import http from './http';

export default {
  registerEmotion(data) {
    return http.post('rating/create', data);
  },
};
