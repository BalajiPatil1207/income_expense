const express = require('express');
const router = express.Router();
const expenseControl = require("../controllers/expenseController");
const auth = require('../middleware/registerMiddle');

router.use(auth)
router.get("/", expenseControl.index);
router.post("/store", expenseControl.store);
router.get("/find/:id", expenseControl.find);
router.put("/update/:id", expenseControl.update);
router.delete("/delete/:id", expenseControl.Delete);

module.exports = router;