const apiUtil = require("../utils/googleapi");

module.exports.fetch = async (req, res) => {
  const sheet_id = req.params.id;
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (token == null)
    return res.status(401).json({
      error: {
        message:
          "Access token is required. Get one at http://localhost:3000/login",
      },
    });
  const data = await apiUtil.readData(sheet_id, token);
  if (data.errors) return res.json({ data: [], errors: data["errors"] });
  res.json({ data: data["data"] });
};

module.exports.update = async (req, res) => {
  const spreadsheet_id = req.body.spreadsheet_id;
  const sheet_id = req.body.sheet_id;
  const row_number = req.body.row_number;
  const column_number = req.body.column_number;
  const value = req.body.value;

  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (token == null)
    return res.status(401).json({
      error: {
        message:
          "Access token is required. Get one at http://localhost:3000/login",
      },
    });

  const data = await apiUtil.updateData(
    spreadsheet_id,
    sheet_id,
    row_number,
    column_number,
    value,
    token
  );
  res.json(data);
};
