const express = require("express");
const router = express.Router();
const CarroController = require("../controllers/CarroController");

router.get("/", CarroController.searchAll);
router.patch("/:codigo", CarroController.searchOne);
router.post("/", CarroController.insert);
router.put("/:codigo", CarroController.alter);
router.delete("/:codigo", CarroController.delete);
router.delete("/", CarroController.deleteAll);

module.exports = router