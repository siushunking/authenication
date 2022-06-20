const postValidation = require('../validation').postValidation
const jwt = require("jsonwebtoken");
const Post = require("../model").postModel

exports.addpostController  = async (req, res) => {
    // // validate the inputs before making a new course
    const { error } = postValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    let { title, description, district } = req.body;
    if (req.user.isEmployee()) {
      return res.status(400).send("Only Employer can post a job.");
    }
  
    let newPost = new Post({
      title,
      description,
      district,
      employer: req.user._id,
    });
  
    try {
      await newPost.save();
      res.status(200).send("New Post has been saved.");
    } catch (err) {
      res.status(400).send("Cannot save post.");
    }
  }

exports.getpostController = (req, res) => {
    let { _id } = req.params;
    Post.findOne({ _id })
      .then((post) => {
        res.send(post);
      })
      .catch((e) => {
        res.send(e);
      });
  }

exports.dispatchpostController =   async (req, res) => {
    // validate the inputs before making a new course
    const { error } = postValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    let { _id } = req.params;
    let post = await Post.findOne({ _id });
    if (!post) {
      res.status(404);
      return res.json({
        success: false,
        message: "post not found.",
      });
    }
  
    if (post.employer.equals(req.user._id) || req.user.isAdmin()) {
      Post.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      })
        .then(() => {
          res.send("Post updated.");
        })
        .catch((e) => {
          res.send({
            success: false,
            message: e,
          });
        });
    } else {
      res.status(403);
      return res.json({
        success: false,
        message:
          "Only the employers of this post or web admin can edit this post.",
      });
    }
  }

