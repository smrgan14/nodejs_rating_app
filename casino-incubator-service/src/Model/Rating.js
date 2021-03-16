import { isObject } from 'lodash';

class Rating {
  constructor(rating) {
    if (!isObject(rating)) {
      throw new Error('InvalidRatingObjectType');
    }
    this.RatingId = rating.ratingId;
    this.EmotionId = rating.emotionId;
    this.TimeRated = rating.timeRated;
  }
}

export default Rating;
