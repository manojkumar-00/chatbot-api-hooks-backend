const express = require("express");
const { sheetsController } = require("../controllers/");

const sheetsRouter = express.Router();

sheetsRouter.get("/", sheetsController.getData);

sheetsRouter.get("/:id", sheetsController.getDataById);

sheetsRouter.get("/email/:email", sheetsController.findUserByEmail);

sheetsRouter.get("/phone/:phone", sheetsController.findUserByPhone);

sheetsRouter.post("/", sheetsController.addData);

sheetsRouter.put("/:id", sheetsController.updateData);

sheetsRouter.delete("/:id", sheetsController.deleteData);

module.exports = sheetsRouter;
