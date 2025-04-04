const express = require("express");
const userController = require("./controllers/userController.js");
const authMiddleware = require("./middlewares/authMiddleware.js");

const router = express.Router();

router
  .route("/users")
  .post(userController.createUser)
  .get(authMiddleware.validateToken, userController.listUsers);

router
  .route("/users/:id")
  .get(authMiddleware.validateToken, userController.getUser)
  .put(authMiddleware.validateToken, userController.updateUser)
  .delete(authMiddleware.validateToken, userController.deleteUser);

router.post("/users/auth", userController.authenticateUser);

module.exports = router;
