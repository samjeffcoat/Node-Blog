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

module.exports = router;
