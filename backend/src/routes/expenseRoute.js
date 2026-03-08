const express = require('express');
const router = express.Router();
const expenseControl = require("../controllers/expenseController");

router.get("/index", expenseControl.index);
router.post("/store", expenseControl.store);
router.get("/find/:id", expenseControl.find);
router.put("/update/:id", expenseControl.update);
router.delete("/delete/:id", expenseControl.Delete);

module.exports = router;