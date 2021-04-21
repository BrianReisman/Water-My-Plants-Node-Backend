// import

const express = require("express");
const helmet = require("helmet");

const authRouter = require("./Auth/auth-router");
// const userRouter = require("./Users/users-router");
// const plantRouter = require('./Plants/plants-router')

// create
const server = express();

// configure
server.use(express.json());
server.use(helmet());
server.use("/api/auth", authRouter);
// server.use('/api/users', userRouter)
// server.use('/api/plants', plantRouter)

server.use("/", (req, res) => {
  res.status(200).json({ message: "api up and deployed" });
});

module.exports = server;
