const express = require('express');
const { verifyIsLoggedIn, verifyIsAdmin } = require("../../commons/middleware/verifyAuthToken");
const { getUsers, registerUser, loginUser, updateUserProfile, getUserProfile } = require('./services');

// const { getUsers, registerUser, loginUser, updateUserProfile, getUserProfile  } = require('../../commons/controllers/userController');
const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)

// user logged in routes:
router.use(verifyIsLoggedIn);
router.put("/profile", updateUserProfile);
router.get('/profile/:id', getUserProfile);

// admin routes:
router.use(verifyIsAdmin);
router.get("/", getUsers);

module.exports = router;
