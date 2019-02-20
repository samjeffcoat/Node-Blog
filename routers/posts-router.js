const express = require("express");

const Posts = require("../data/helpers/postDb");

const router = express.Router();

//get posts
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.get();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      error: "The posts information you are looking for cannot be found"
    });
  }
});

//GEt Posts by ID

router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.getById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with that id cannot be found, sir!" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "That post information could not be found!" });
  }
});

//Post to specific ID
router.post("/", async (req, res) => {
  try {
    const { text, user_id } = req.body;
    if (!text || !user_id) {
      res
        .status(400)
        .json({ message: "Please enter both text and user id to post!" });
    } else {
      const newPost = await Posts.insert(req.body);
      res.status(201).json(newPost);
    }
  } catch {
    res.status(500).json({ message: "Your post could not be added!" });
  }
});
module.exports = router;
