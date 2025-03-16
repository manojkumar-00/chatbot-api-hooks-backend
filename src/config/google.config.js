const { google } = require("googleapis");
const { SECRET_KEY_NAME } = require("./server.config");
const path = require("path");

const keyFile = path.resolve(SECRET_KEY_NAME);
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

let authInstance = null;

async function getAuthToken() {
  if (!authInstance) {
    authInstance = new google.auth.GoogleAuth({ keyFile, scopes: SCOPES });
  }
  return authInstance.getClient();
}

async function getSheetsObject() {
  const auth = await getAuthToken(); // Await here to ensure auth is ready
  return google.sheets({ version: "v4", auth });
}

module.exports = { getAuthToken, getSheetsObject };
