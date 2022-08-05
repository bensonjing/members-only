import express from "express";
import { body, validationResult } from "express-validator";
const router = express.Router();

import * as userController from "../controllers/userController";

router.get("/", userController.user_member_get);

router.post("/", userController.user_member_post);

export default router;
