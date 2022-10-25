const express = require ("express");
const router = express.Router()
const CadUserController = require("../controllers/CadUserController");

router.post("/", CadUserController.Create);
router.delete("/:codigo", CadUserController.Delete)

module.exports = router