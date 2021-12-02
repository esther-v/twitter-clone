const express = require("express");
const isAuth = require('../middlewares/isAuth');
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", isAuth, userController.findAll);

router.get("/signup", userController.signup);
router.post("/signup", userController.newAccount);
router.get("/login", userController.login);
router.post("/login", userController.authenticate);
router.get("/logout", userController.logout);

router.get("/profile/:username", isAuth, userController.profile);
router.get("/profile/:username/:id_tweet", isAuth, userController.tweetDetails);

router.post("/tweets", isAuth, userController.addOne);
router.get("/tweets/:id/delete", isAuth, userController.deleteOne);

module.exports = router;

