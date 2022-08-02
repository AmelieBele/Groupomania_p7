const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user-controllers");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:id", userCtrl.getUser)

module.exports = router;
