const express = require("express");
const { StatusCodes } = require("http-status-codes");

const sheetsRouter = require("./sheets.routes");

const apiRouter = express.Router();

apiRouter.get("/", (_, res) => {
  res.status(StatusCodes.OK).json({
    message: `API Router is live`,
  });
});

apiRouter.use("/sheets", sheetsRouter);

module.exports = apiRouter;
