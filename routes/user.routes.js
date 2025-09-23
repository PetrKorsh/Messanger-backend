const Router = require("express").Router;
const router = new Router();
const userController = require("../controllers/user.controller");
const userValidator = require("../validators/user.validator");
const validate = require("../middleware/validate");

router.post(
  "/user/registration",
  userValidator,
  validate,
  userController.createUser
);
router.get("/user", userController.getUsers);
router.get("/user/:id", userController.getOneUser);
router.put("/user", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
