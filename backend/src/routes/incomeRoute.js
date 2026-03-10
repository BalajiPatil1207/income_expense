const express = require('express');
const router = express.Router();
const incomeControl = require("../controllers/incomeController");

router.get("/", incomeControl.index);
router.post("/store", incomeControl.store);
router.get("/find/:id", incomeControl.find);
router.put("/update/:id", incomeControl.update);
router.delete("/delete/:id", incomeControl.Delete);

module.exports = router;