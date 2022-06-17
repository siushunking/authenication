const router = require("express").Router();
const authController = require('../controller/auth-controller')

router.use((req, res, next) => {
  console.log("A request is coming in to auth.js");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "Test API is working.",
  };
  return res.json(msgObj);
});

router.post("/register", authController.postRegisterController);

router.post("/login", authController.postLoginController);

module.exports = router;
