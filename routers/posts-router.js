const express = require("express");

const Posts = require("../data/helpers/postDb");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.get();
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "The posts information you are looking for cannot be found"
      });
  }
});

module.exports = router;
