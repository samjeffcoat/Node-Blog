const express = require('express');
const postsRouter= require('./routers/posts-router');
const server= express();

server.use(express.json());
server.use('/api/posts', postsRouter );
server.get('/', (req,res) => {
    res.send(`
    <h2>Sams Posts</h>
    <p>Welcome to my API </p>
    `);
});

module.exports = server