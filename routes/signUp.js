import express from "express";
import { body, validationResult } from "express-validator";
const router = express.Router();

import * as userController from "../controllers/userController";

router.get("/", userController.user_create_get);

router.post("/", userController.user_create_post);

export default router;
