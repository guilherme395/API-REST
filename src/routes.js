import express from "express";
const router = express.Router();
import userController from "./controllers/userController.js";

router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.get("/users", userController.listUsers);
router.get("/users/:id", userController.getUser);

export default router;
