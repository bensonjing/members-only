import express from "express";
const router = express.Router();

import * as userController from "../controllers/userController";

router.get("/", userController.user_login_get);

export default router;
