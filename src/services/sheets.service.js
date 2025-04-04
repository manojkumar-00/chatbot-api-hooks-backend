const { SheetsRepo } = require("../repository/");

const sheetsRepo = new SheetsRepo();

class SheetsService {
  async addData(data) {
    try {
      if (await sheetsRepo.findUserByEmail(data?.email)) {
        throw new Error("Email already used!");
      }
      if (await sheetsRepo.findUserByPhone(data?.phone)) {
        throw new Error("Phone already used!");
      }
      const nextId = await sheetsRepo.getNextId();
      const values = [
        nextId,
        data.name,
        data.email,
        data.gender || "NA",
        data.phone,
        data.branch || "",
        data.year || "NA",
      ];
      await sheetsRepo.addData(values);
    } catch (error) {
      throw error;
    }
  }

  async getData() {
    try {
      const rows = await sheetsRepo.getData();
      if (!rows || rows.length < 2) {
        throw new Error("No data found!");
      }

      const headers = rows[0];
      return rows.slice(1).map((row) => {
        let obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index] || "";
        });
        return obj;
      });
    } catch (error) {
      throw error;
    }
  }

  async getDataById(id) {
    try {
      return await sheetsRepo.getDataById(id);
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email) {
    try {
      return await sheetsRepo.findUserByEmail(email);
    } catch (error) {
      throw error;
    }
  }

  async findUserByPhone(phone) {
    try {
      return await sheetsRepo.findUserByPhone(phone);
    } catch (error) {
      throw error;
    }
  }

  async updateData(id, receivedData) {
    try {
      const updatedData = [
        receivedData.name || "",
        receivedData.email || "",
        receivedData.gender || "NA",
        receivedData.phone || "",
        receivedData.branch || "",
        receivedData.year || "NA",
      ];
      await sheetsRepo.updateData(id, updatedData);
    } catch (error) {
      throw error;
    }
  }

  async deleteData(id) {
    try {
      await sheetsRepo.deleteData(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SheetsService;
