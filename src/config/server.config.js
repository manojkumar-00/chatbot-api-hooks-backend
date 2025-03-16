require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  SPREADSHEET_ID: process.env.SPREADSHEET_ID,
  SECRET_KEY_NAME: process.env.SECRET_KEY_NAME,
};
