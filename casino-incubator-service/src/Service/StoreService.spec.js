/* eslint "no-undef" : "off" */
import storeService from './StoreService';
import mockData from '../Model/__mocks__/MockData';
import Emotion from '../Model/Emotion';
import Rating from '../Model/Rating';

describe('Store service', () => {
  it('should initialize store', () => {
    storeService.init(mockData);
    expect(typeof storeService.getState().emotions).toEqual('object');
  });

  it('should get emotion', () => {
    const emotion = storeService.getEmotion(1);
    expect(emotion).toBeInstanceOf(Emotion);
  });

  it('should get rating', () => {
    const rating = storeService.getRating(1);
    expect(rating).toBeInstanceOf(Rating);
  });

  it('should be an objects', () => {
    const emotions = storeService.getEmotions();
    expect(typeof emotions).toBe('object');
  });

  it('should be equal', () => {
    const emotions = {
      1: { emotionId: 1, name: 'Happy' },
      2: { emotionId: 2, name: 'Satisfied' },
      3: { emotionId: 3, name: 'Meh' },
      4: { emotionId: 4, name: 'Dissatisfied' },
      5: { emotionId: 5, name: 'Sad' },
    };

    expect(storeService.getEmotions()).toEqual(emotions);
  });

  test('Is equal objects', () => {
    const emotions = {
      1: { emotionId: 1, name: 'Happy' },
      2: { emotionId: 2, name: 'Satisfied' },
      3: { emotionId: 3, name: 'Meh' },
      4: { emotionId: 4, name: 'Dissatisfied' },
      5: { emotionId: 5, name: 'Sad' },
    };
    expect(storeService.getEmotions()).toEqual(emotions);
  });
});
