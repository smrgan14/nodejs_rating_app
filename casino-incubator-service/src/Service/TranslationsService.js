class TranslationsService {
  constructor() {
    this.translations = {
      message: 'Thank you for your rating',
    };
  }

  getTranslations() {
    return this.translations;
  }
}

export default new TranslationsService();
