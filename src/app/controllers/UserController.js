const UserUtil = require("../utils/UserUtil");

class UserController {
  formatPayload(req, res) {
    const { body } = req;

    const formattedBody = UserUtil.removeEmptyValues(body);

    res.json(formattedBody);
  }
}

module.exports = new UserController();
