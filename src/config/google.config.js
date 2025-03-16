const { google } = require("googleapis");
const { GOOGLE_APPLICATION_CREDENTIALS_JSON } = require("./server.config");

const credentials = JSON.parse(GOOGLE_APPLICATION_CREDENTIALS_JSON);
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

let authInstance = null;

async function getAuthToken() {
  if (!authInstance) {
    authInstance = new google.auth.GoogleAuth({ credentials, scopes: SCOPES });
  }
  return authInstance.getClient();
}

async function getSheetsObject() {
  const auth = await getAuthToken(); // Await here to ensure auth is ready
  return google.sheets({ version: "v4", auth });
}

module.exports = { getAuthToken, getSheetsObject };
