import { cloneDeep, isObject } from 'lodash';
import state from './State';
import Emotion from './Emotion';
import Rating from './Rating';

class Store {
  constructor() {
    this.state = state;
  }

  init(stateData) {
    if (!isObject(stateData)) {
      throw new Error('InvalidStateTypeObject');
    }

    const data = cloneDeep(stateData);

    this.state.emotions = data.emotions;
    this.state.ratings = data.ratings;
  }

  getEmotions() {
    return this.state.emotions;
  }

  getEmotion(emotionId) {
    return new Emotion(this.state.emotions[emotionId]);
  }

  getRatings() {
    return this.state.ratings;
  }

  getRating(ratingId) {
    return new Rating(this.state.ratings[ratingId]);
  }
}

export default Store;
