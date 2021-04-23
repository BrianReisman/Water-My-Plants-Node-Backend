const route = require("express").Router();
const users = require("./users-model");

route.get("/", (req, res) => {
  console.log("[get] / users.js");
});

route.get("/:id", async (req, res) => {
  const user_id = req.params.id;
  try {
    const user = await users.findById(user_id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "unable to find a user by that id" });
    }
  } catch (err) {
    res.status(500).json({ message: "server side error" });
  }
});

module.exports = route;
