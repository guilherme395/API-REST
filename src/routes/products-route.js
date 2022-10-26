const express = require("express");
const router = express.Router();
const ProductsController = require("../controllers/ProductsController")

router.get("/", ProductsController.SearchAll);
router.patch("/:idProduct", ProductsController.SearchOne);
router.post("/", ProductsController.Insert);
router.put("/:idProduct", ProductsController.Alter);
router.delete("/:idProduct", ProductsController.Delete);
router.delete("/", ProductsController.DeleteAll);

module.exports = router;