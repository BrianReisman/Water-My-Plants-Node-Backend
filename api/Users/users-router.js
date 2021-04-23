const route = require("express").Router();
const users = require("./users-model");
const { userExists } = require('./user-middleware')

route.get("/", (req, res) => {
  console.log("[get] / users.js");
});

// get all plants owned by this user's id
//// add middleware to make sure user with that id exists
route.get("/:userid", userExists, async (req, res) => {
  const user_id = req.params.userid;
  try {
    const user = await users.findAllPlantsByUserId(user_id);
    if ([user]) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "unable to find a user by that id" });
    }
  } catch (err) {
    res.status(500).json({ message: "server side error" });
  }
});

module.exports = route;
