import Store from '../Model/Store';

class StoreService {
  constructor() {
    this.store = new Store();
  }

  init(state) {
    this.store.init(state);
  }

  getState() {
    return this.store.state;
  }

  getEmotions() {
    return this.store.getEmotions();
  }

  getEmotion(emotionId) {
    return this.store.getEmotion(emotionId);
  }

  getRatings() {
    return this.store.getRatings();
  }

  getRating(ratingId) {
    return this.store.getRating(ratingId);
  }
}

export default new StoreService();
