const express = require("express");

const apiRouter = express.Router();

apiRouter.get("/", (_, res) => {
  res.status(200).json({
    message: `API Router is live`,
  });
});

module.exports = apiRouter;
