const express = require("express");
const router = express.Router();
const CadUserController = require("../controllers/CadUserController");

router.get("/", CadUserController.SearchAll);
router.patch("/:idUser", CadUserController.SearchOne);
router.post("/", CadUserController.Insert);
router.put("/:idUser", CadUserController.Alter);
router.delete("/:idUser", CadUserController.Delete);
router.delete("/", CadUserController.DeleteAll);

module.exports = router;