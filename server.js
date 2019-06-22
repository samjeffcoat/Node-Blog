const express = require("express");
const postsRouter = require("./routers/posts-router");
const usersRouter = require("./routers/users-router");

const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);
server.get("/", (req, res) => {
  res.send(`
    <h2>Sams Posts</h>
    <p>Welcome to my API </p>
    `);
});

module.exports = server;
