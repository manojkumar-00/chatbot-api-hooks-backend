require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  SPREADSHEET_ID: process.env.SPREADSHEET_ID,
};
