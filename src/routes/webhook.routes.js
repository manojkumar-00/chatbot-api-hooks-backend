const express = require("express");
const { handleAllOperations } = require("../middlewares/webhook.middleware");

const webhookRouter = express.Router();

webhookRouter.post("/", handleAllOperations);

module.exports = webhookRouter;
