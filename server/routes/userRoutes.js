import express from 'express';
import { register, login, setAvatar } from "../controller/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);

export default router;