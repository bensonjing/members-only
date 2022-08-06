var express = require("express");
var router = express.Router();

import * as messageController from "../controllers/messageController";

/* GET home page. */
router.get("/", messageController.message_list);

router.get("/create-message", messageController.create_message_get);

module.exports = router;
