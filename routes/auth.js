const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const { signup, signin, getuser } = require("../controllers/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/getuser", verifyToken, getuser);

module.exports = router;
