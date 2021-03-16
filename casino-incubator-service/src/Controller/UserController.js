import userService from '../Service/UserService';

/* eslint "class-methods-use-this": "off" */
class UserController {
  async postUser(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        refreshToken,
      } = req.body;

      const data = await userService.postUser(
        firstName,
        lastName,
        email,
        refreshToken,
      );
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async putUser(req, res) {
    try {
      const { userId } = req.params;
      const {
        firstName,
        lastName,
        email,
        refreshToken,
      } = req.body;

      const data = await userService.putUser(
        userId,
        firstName,
        lastName,
        email,
        refreshToken,
      );
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async putTokens(req, res) {
    try {
      const { userId } = req.params;
      const { refreshToken } = req.body;
      const data = await userService.putTokens(
        userId,
        refreshToken,
      );
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async getTokensByUserId(req, res) {
    try {
      const data = await userService.getTokensByUserId(req.params.userId);
      console.log(req.params.userId);
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send({ messageDetails: error.message });
    }
  }
}
export default new UserController();
