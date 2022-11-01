const express = require("express");
const router = express.Router();
const CadUserController = require("../controllers/CadUserController");

router.post("/", CadUserController.Insert);

module.exports = router;