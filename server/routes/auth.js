const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  getUser
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers", getAllUsers);
router.get("/user/:id", getUser);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

module.exports = router;