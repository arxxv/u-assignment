const { default: axios } = require("axios");
const { numberToLetter } = require("./misc");

module.exports.readData = async (spreadsheetId, token) => {
  const responseBody = { data: {}, errors: undefined };
  try {
    const metadata = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`,
      { headers: { Authorization: "Bearer " + token } }
    );
    for (sheet of metadata.data.sheets) {
      const sheetId = sheet.properties.title;
      responseBody.data[sheetId] = [];
      const data = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetId}`,
        { headers: { Authorization: "Bearer " + token } }
      );
      data.data.values.forEach((row) => {
        formattedRow = {};
        row.forEach((value, ind) => {
          formattedRow[ind] = value;
        });
        responseBody.data[sheetId].push(formattedRow);
      });
    }
  } catch (err) {
    responseBody.errors = err.response.data.error;
  }
  return responseBody;
};

module.exports.updateData = async (
  spreadsheetId,
  sheet_id,
  row_number,
  column_number,
  value,
  token
) => {
  const responseBody = { error: [], success: false };
  if (row_number < 1) {
    responseBody.error = {
      message: "Invalid row_number field",
    };
    return responseBody;
  }
  if (column_number < 0) {
    responseBody.error = {
      message: "Invalid column_number field",
    };
    return responseBody;
  }
  try {
    const range = `${sheet_id}!${numberToLetter(
      column_number
    )}${row_number}:${numberToLetter(column_number)}${row_number}`;
    const res = await axios.put(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=RAW`,
      {
        values: [[value]],
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    responseBody.success = true;
  } catch (err) {
    responseBody.error = err.response.data.error;
  }
  return responseBody;
};
