const { Router } = require("express");

const UserController = require("./app/controllers/UserController");

const router = Router();

router.post("/users/format-payload", UserController.formatPayload);

module.exports = router;
