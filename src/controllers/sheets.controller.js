const { StatusCodes } = require("http-status-codes");
const { SheetsService } = require("../services/");

const sheetsService = new SheetsService();

async function addData(req, res) {
  try {
    const data = req.body;
    await sheetsService.addData(data);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully added data",
    });
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to add data",
      error: error.message,
    });
  }
}

async function getData(req, res) {
  try {
    const response = await sheetsService.getData();
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully fetched data",
      data: response,
    });
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
}

async function getDataById(req, res) {
  try {
    const { id } = req.params;
    const data = await sheetsService.getDataById(id);
    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `No data found for ID ${id}`,
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Data retrieved successfully",
      data,
    });
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to retrieve data",
      error: error.message,
    });
  }
}

async function findUserByEmail(req, res) {
  try {
    const { email } = req.params;
    const exists = await sheetsService.findUserByEmail(email);
    res.status(StatusCodes.OK).json({
      success: true,
      message: exists ? "User found" : "User not found",
      exists,
    });
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to search user by email",
      error: error.message,
    });
  }
}

async function findUserByPhone(req, res) {
  try {
    const { phone } = req.params;
    const exists = await sheetsService.findUserByPhone(phone);
    res.status(StatusCodes.OK).json({
      success: true,
      message: exists ? "User found" : "User not found",
      exists,
    });
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to search user by phone",
      error: error.message,
    });
  }
}

async function updateData(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    await sheetsService.updateData(id, updatedData);
    res.status(StatusCodes.OK).json({
      success: true,
      message: `Data updated for ID ${id}`,
    });
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Failed to update data for ID ${id}`,
      error: error.message,
    });
  }
}

async function deleteData(req, res) {
  try {
    const { id } = req.params;
    await sheetsService.deleteData(id);
    res.status(StatusCodes.OK).json({
      success: true,
      message: `Data deleted for ID ${id}`,
    });
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Failed to delete data for ID ${id}`,
      error: error.message,
    });
  }
}

module.exports = {
  addData,
  getData,
  getDataById,
  findUserByEmail,
  findUserByPhone,
  updateData,
  deleteData,
};
