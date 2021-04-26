const route = require("express").Router();
const users = require("./users-model");
const { userExists } = require("./user-middleware");

// get *all* plants owned by this user vai user's id
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
}); //*

// get specific plant owned by this user
route.get("/:userid/:plantid", userExists, async (req, res) => {
  try {
    const [plant] = await users.findPlantById(req.params);
    if (plant) {
      res.status(200).json(plant);
    } else {
      res.status(400).json({
        message: `The user with an id of ${user_id} currently has not plants in their account`,
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "server side error, [get] /:userid/:plantid" });
  }
}); //*

// TODO: add a new plant
route.post("/:userid", async (req, res) => {
  const { userid } = req.params;
  const newPlant = req.body;

  try {
    const addedPlant = await users.addNewPlant(newPlant, userid);
    console.log('user-router',addedPlant);


  } catch (err) {
    res.status(500).json({ message: "server side error in [POST] /:userid" });
  }
});

// TODO: delete plant by plant_id
route.delete("/:userid/:plantid", async (req, res) => {
  const deletedPlant = await users.deletePlant(req.params);
  console.log(deletedPlant);
});
// TODO: delete plant by plant_id

module.exports = route;
