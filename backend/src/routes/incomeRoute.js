const express = require('express');
const router = express.Router();
const incomeControl = require("../controllers/incomeController");
const auth = require('../middleware/registerMiddle');

router.use(auth);
router.get("/income/:id", incomeControl.index);
router.post("/store", incomeControl.store);
router.get("/find/:id", incomeControl.find);
router.put("/update/:id", incomeControl.update);
router.delete("/delete/:id", incomeControl.Delete);

module.exports = router;