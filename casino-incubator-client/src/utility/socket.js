import store from '../store';

export const connect = () => {
  console.log('Socket connected!');
};
export const updateSettingsEmotionList = (data) => {
  store.dispatch('updateEmotionList', data.config.numberOfEmotions);
};
export const updateSettingsConfigState = (data) => {
  store.dispatch('updateConfigState', data);
};
