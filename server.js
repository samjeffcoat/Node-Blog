const express = require('express');

const server= express();

server.use(express.json());

server.get('/', (req,res) => {
    res.send(`
    <h2>Sams Posts</h>
    <p>Welcome to my API </p>
    `);
});

module.exports = server