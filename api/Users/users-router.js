const route = require("express").Router();
const users = require("./users-model");
const { userExists } = require("./user-middleware");

// get all plants owned by this user's id
//// add middleware to make sure user with that id exists
route.get("/:userid", userExists, async (req, res) => {
  const user_id = req.params.userid;
  try {
    const user = await users.findAllPlantsByUserId(user_id);
    if (user.length === 0) {
      res.status(400).json({
        message: `The user with an id of ${user_id} currently has not plants in their account`,
      });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ message: "server side error" });
  }
});

module.exports = route;
