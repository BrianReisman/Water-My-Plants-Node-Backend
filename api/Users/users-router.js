const route = require("express").Router();
const users = require("./users-model");
const { userExists, plantExists } = require("./user-middleware");

//* get *all* plants owned by this user vai user's id
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

//* get specific plant owned by this user
route.get("/:userid/:plantid", userExists, async (req, res) => {
  try {
    const [plant] = await users.findPlantById(req.params);
    if (plant) {
      res.status(200).json(plant);
    } else {
      res.status(400).json({
        message: `the user with an id of ${req.params.userid} has no plant with an id of ${req.params.plantid}`,
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "server side issue [GET] /:userid/:plantid" });
  }
}); //*

//* add a new plant
//TODO: add validation to req.body
route.post("/:userid", async (req, res) => {
  const { userid } = req.params;
  const newPlant = req.body;

  try {
    const [addedPlant] = await users.addNewPlant(newPlant, userid);
    if (addedPlant) {
      res.status(201).json(addedPlant);
    } else {
      res.status(400).json({ message: "unable to add plant" });
    }
  } catch (err) {
    res.status(500).json({ message: "server side error in [POST] /:userid" });
  }
}); //*

//* delete plant by plant_id
route.delete("/:userid/:plantid", async (req, res) => {
  const deletedPlant = await users.deletePlant(req.params);
  console.log(deletedPlant);
  if (!deletedPlant) {
    res.status(400).json({
      message: `plant with an id: ${req.params.plantid} does not exist to delete.`,
    });
  } else {
    res
      .status(200)
      .json({ message: `plant with an id: ${req.params.plantid} was deleted` });
  }
}); //*

//* update plant
route.put("/:userid/:plantid", plantExists, async (req, res) => {
  const updatedPlant = req.body;
  const { plantid, userid } = req.params;

  try {
    const [plant] = await users.updatePlant(updatedPlant, plantid, userid);
    if (plant) {
      res.status(200).json(plant);
    } else {
      res.status(400).json({
        message: `failed to update`,
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "server side error, [PUT] /:userid/:plantid" });
  }
});

module.exports = route;
