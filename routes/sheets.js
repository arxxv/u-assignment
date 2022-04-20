const express = require("express");
const router = express.Router();
const sheetController = require("../controllers/sheets");

router.post("/update", sheetController.update);
router.get("/:id", sheetController.fetch);

module.exports = router;
