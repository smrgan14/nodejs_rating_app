import { isObject } from 'lodash';

class Emotion {
  constructor(emotion) {
    if (!isObject(emotion)) {
      throw new Error('InvalidEmotionTypeError');
    }
    this.EmotionId = emotion.EmotionId;
    this.Name = emotion.Name;
  }
}

export default Emotion;
