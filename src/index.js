const express = require("express");
const bodyParser = require("body-parser");
const { StatusCodes } = require("http-status-codes");

const { PORT } = require("./config/server.config");

const apiRouter = require("./routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());

app.get("/ping", (_, res) => {
  console.log("Called server");
  res.status(StatusCodes.OK).json({
    message: `Sever is live at PORT:${PORT}`,
  });
});

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Sever is live at PORT:${PORT}`);
});
