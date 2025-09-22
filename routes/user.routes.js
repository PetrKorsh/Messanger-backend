const Router = require("express").Router;
const router = new Router();
const userController = require("../controllers/user.controller");

router.post("/user/registration", userController.createUser);
router.get("/user", userController.getUsers);
router.get("/user/:id", userController.getOneUser);
router.put("/user", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
