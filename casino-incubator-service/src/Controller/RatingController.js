/* eslint "class-methods-use-this": "off" */
import ratingsService from '../Service/RatingsService';

class RatingController {
  async postRatings(req, res) {
    try {
      const { id } = req.body;
      const data = await ratingsService.postRatings(id);

      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new RatingController();
