/* eslint "no-undef" : "off" */
import translations from './TranslationsService';

describe('Translations service', () => {
  it('should be an object', () => {
    expect(typeof translations.getTranslations()).toBe('object');
  });

  it('should be a function', () => {
    expect(typeof translations.getTranslations).toBe('function');
  });
});
