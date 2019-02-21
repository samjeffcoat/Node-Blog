const express = require("express");

const db = require("../data/helpers/userDb");

const router = express.Router();

//get users

router.get("/", async (req, res) => {
  try {
    const users = await db.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: "The users information you are looking for cannot be found"
    });
  }
});

// get users by id

router.get("/:id", async (req, res) => {
  try {
    const user = await db.getById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with that id cannot be found, good sit@" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "That post information could not be found" });
  }
});

// Get posts by a given user

router.get("/:id/posts", async (req, res) => {
  try {
    let posts = await db.getUserPosts(req.params.id);
    if (posts.length) {
      res.status(200).json(posts);
    } else {
      res
        .status(404)
        .json({ error: true, message: "No posts found for that given user" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: true,
        message: " We are unable to find any posts for that user."
      });
  }
});

/// Create a new user

router.post("/", async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ error: "Please provide a name for the user." });
    return;
  }
  try {
    const newUser = {
      name: req.body.name
    };

    let bdUser = await db.insert(newUser);
    let theUser = await db.getById(bdUser.id);
    res.status(201).json(theUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "There was an error adding that user to your database!" });
  }
});
// deletes a user based on given id. as long as it is greater than 0 then it will be deleted. Successfully deleted a user
router.delete("/:id", async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "That user has been nuked!" });
    } else {
      res.status(404).json({ message: "That user could not be found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "There was an error removing that user!" });
  }
});

module.exports = router;
