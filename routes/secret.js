const router = require("express").Router();

router.get("/testAPI", (req, res) => {
    const msgObj = {
      message: "Test API is working.",
    };
    return res.json(msgObj);
  });

module.exports = router;