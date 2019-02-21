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

module.exports = router;
