import http from './http';

export default {
  sendGoogleAuthCode(authCode) {
    return http.get('login/google/token/', {
      params: {
        code: authCode,
      },
    });
  },
};
