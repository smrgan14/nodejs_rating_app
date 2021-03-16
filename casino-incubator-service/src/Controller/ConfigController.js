import configService from '../Service/ConfigService';

/* eslint "class-methods-use-this": "off" */
class ConfigController {
  async getSettings(req, res) {
    try {
      const data = await configService.getSettings();
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send({ messageDetails: error.message });
    }
  }

  async updateSettings(req, res) {
    try {
      const { numberOfEmotions } = req.body;
      const { ratingMessage } = req.body;
      const { messageTimeOut } = req.body;
      const data = await configService
        .updateSettings(numberOfEmotions, ratingMessage, messageTimeOut);

      res.status(200).send(data);
    } catch (error) {
      res.status(400).send({ messageDetails: error.message });
    }
  }
}

export default new ConfigController();
