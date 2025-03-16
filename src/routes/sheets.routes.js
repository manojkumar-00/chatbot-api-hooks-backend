const express = require("express");
const { sheetsController } = require("../controllers/");

const sheetsRouter = express.Router();

sheetsRouter.get("/", sheetsController.getData);

sheetsRouter.post("/fetch-data/:id", sheetsController.getDataById);

sheetsRouter.post("/check-email/:email", sheetsController.findUserByEmail);

sheetsRouter.post("/check-phone/:phone", sheetsController.findUserByPhone);

sheetsRouter.post("/", sheetsController.addData);

sheetsRouter.put("/:id", sheetsController.updateData);

sheetsRouter.delete("/:id", sheetsController.deleteData);

module.exports = sheetsRouter;
