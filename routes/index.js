var express = require("express");
var router = express.Router();

import * as messageController from "../controllers/messageController";

/* GET home page. */
router.get("/", messageController.message_list);

module.exports = router;
