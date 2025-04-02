const { StatusCodes } = require("http-status-codes");
const {
  getDataById,
  addData,
  findUserByEmail,
  findUserByPhone,
} = require("../controllers/sheets.controller");

async function handleAllOperations(req, res) {
  try {
    const purpose = req?.query?.purpose;
    const data = req?.query?.data;

    const parsedData = data && JSON.parse(data);

    switch (purpose) {
      case "fetchById":
        req.params.id = parsedData?.id;
        getDataById(req, res);
        break;

      case "validateByEmail":
        req.params.email = parsedData?.email;
        findUserByEmail(req, res);
        break;

      case "validateByPhone":
        req.params.phone = parsedData?.email;
        findUserByPhone(req, res);
        break;

      case "addRecord":
        const userData = {
          name: parsedData.studentName,
          email: parsedData.studentEmail,
          gender: parsedData.gender,
          phone: parsedData.mobileNumber,
          branch: parsedData.studentCourse,
          year: parsedData.year,
        };

        req.body = userData;
        addData(req, res);
        break;
      default:
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Something went wrong",
        });
    }
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

module.exports = {
  handleAllOperations,
};
