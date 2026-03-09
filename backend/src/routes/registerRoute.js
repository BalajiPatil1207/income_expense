const express = require('express');
const router = express.Router();
const registerControl = require("../controllers/registerController");
const auth = require('../middleware/registerMiddle');

router.post("/register", registerControl.register);
router.post("/login", registerControl.login);

router.get("/index",auth, registerControl.index);
router.post("/store", registerControl.store);
router.get("/find/:id", registerControl.find);
router.put("/update/:id", registerControl.update);
router.delete("/delete/:id", registerControl.Delete);


module.exports = router;