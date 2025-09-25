const Router = require("express").Router;
const router = new Router();
const userController = require("../controllers/user.controller");
const userValidator = require("../validators/user.validator");
const validate = require("../middleware/validate");
const authValidator = require("../validators/auth.validator");
const auth = require("../middleware/auth");

router.post(
  "/user/registration",
  userValidator,
  validate,
  userController.createUser
);
router.post("/user", authValidator, validate, userController.Authorization);
router.get("/user", auth, userController.getProfile);

module.exports = router;
