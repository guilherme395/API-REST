import express from "express";
const router = express.Router();
import userController from "./controllers/userController.js";
import authMiddleware from "./middlewares/authMiddleware.js";

router.post("/users", userController.createUser);
router.put(
	"/users/:id",
	authMiddleware.validateToken,
	userController.updateUser
);
router.delete(
	"/users/:id",
	authMiddleware.validateToken,
	userController.deleteUser
);
router.get("/users", authMiddleware.validateToken, userController.listUsers);
router.get("/users/:id", authMiddleware.validateToken, userController.getUser);
router.post("/users/auth", userController.authenticateUser);

export default router;
