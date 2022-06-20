const router = require("express").Router();
const Post = require("../model").postModel
const addpostController = require('../controller/post-controller')
const postValidation = require('../validation').postValidation
router.get("", (req, res) => {
    const msgObj = {
      message: "Test API is working.",
    };
    return res.json(msgObj);
  });

  router.post("/add-post", addpostController.addpostController);
  
  router.get("/:_id", addpostController.getpostController);

  router.patch("/:_id", addpostController.dispatchpostController);




module.exports = router;