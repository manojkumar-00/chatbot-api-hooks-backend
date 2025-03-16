const { SPREADSHEET_ID } = require("../config/server.config");
const { getSheetsObject } = require("../config/google.config");

class SheetsRepo {
  async getNextId() {
    const sheets = await getSheetsObject();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:A", 
    });

    const rows = response.data.values;

    if (!rows || rows.length < 2) {
      return 1; 
    }

   
    let lastRow = rows.filter((row) => row[0]).pop(); 

    let lastId = parseInt(lastRow[0], 10);
    return isNaN(lastId) ? 1 : lastId + 1;
  }

  async getData() {
    try {
      const sheets = await getSheetsObject();
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "Sheet1!A:G",
      });
      return response.data.values || [];
    } catch (error) {
      throw error;
    }
  }

  async getDataById(id) {
    const data = await this.getData();
    if (!data || data.length < 2) return null;

    const headers = data[0];
    const row = data.slice(1).find((row) => row[0] == id);
    if (!row) return null;

    let obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] || "";
    });
    return obj;
  }

  async findUserByEmail(email) {
    const data = await this.getData();
    return data.slice(1).some((row) => row[2] === email);
  }

  async findUserByPhone(phone) {
    const data = await this.getData();
    return data.slice(1).some((row) => row[4] === phone);
  }

  async addData(values) {
    try {
      const sheets = await getSheetsObject();

      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: "Sheet1!A2",
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        resource: { values: [values] },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateData(id, updatedData) {
    const sheets = await getSheetsObject();
    const existingData = await this.getData();

    const rowIndex = existingData.findIndex(
      (row, index) => index !== 0 && row[0] == id
    );
    if (rowIndex === -1) {
      throw new Error(`No entry found with ID ${id}`);
    }
    const updatedValues = [parseInt(id), ...updatedData];
    const updateRange = `Sheet1!A${rowIndex + 1}:G${rowIndex + 1}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: updateRange,
      valueInputOption: "RAW",
      resource: { values: [updatedValues] },
    });
  }

  async deleteData(id) {
    const sheets = await getSheetsObject();
    const existingData = await this.getData();

    const rowIndex = existingData.findIndex((row) => row[0] == id);
    if (rowIndex === -1) {
      throw new Error(`No entry found with ID ${id}`);
    }

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0,
                dimension: "ROWS",
                startIndex: rowIndex,
                endIndex: rowIndex + 1,
              },
            },
          },
        ],
      },
    });
  }
}

module.exports = SheetsRepo;
