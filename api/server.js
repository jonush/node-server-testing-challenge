const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/auth', authRouter);

server.get('/', (req,res) => {
  res.status(200).json({ api: "running" });
});

module.exports = server;