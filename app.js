const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");
const bodyParser = require("body-parser");
const sheetRouter = require("./routes/sheets");
const authRouter = require("./routes/auth");
require("dotenv").config();

const app = express();
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/login", (req, res) => {
  const client_id = process.env.CLIENT_ID;
  res.render("index", { client_id });
});

app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/spreadsheet", sheetRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
