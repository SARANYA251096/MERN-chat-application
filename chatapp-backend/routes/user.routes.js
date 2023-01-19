const express = require("express");
const { isAuth } = require("../utils/authentication");
const { getUser } = require('../controllers/user.controller');
const router = express.Router();

router.get("/user", isAuth, getUser);

module.exports = router;
