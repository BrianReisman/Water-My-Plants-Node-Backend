// import
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("./Auth/auth-router");
const userRouter = require("./Users/users-router");
// const plantRouter = require('./Plants/plants-router')
const { restricted } = require("./Auth/auth-middleware");

// create
const server = express();

// configure
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", restricted, userRouter);
// server.use('/api/plants', plantRouter)

const user = require("./Users/users-model");

server.get("/allUsers", async (req, res) => {
  // res.status(200).json({message: 'another endpoint'})
  try {
    const allUsers = await user.getAll();
    if (allUsers) {
      res.status(200).json(allUsers);
    } else {
      res.status(400).json({ message: "cannot get all users" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

server.get("/", (req, res) => {
  res.status(200).json({ message: "api up and deployed...and deployed anew!" });
});

module.exports = server;
