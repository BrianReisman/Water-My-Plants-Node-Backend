const db = require("../../data/dbConfig");

const getAll = () => {
  return db("users");
};

const findUserById = (user_id) => {
  return db("users").where({ user_id }).first();
};

const findByUsername = (username) => {
  return db("users").where({ username: username });
};

const findAllPlantsByUserId = (user_id) => {
  return db("users")
    .join("plants", "plants.user_id", "users.user_id")
    .select(
      "users.user_id",
      "plants.h20_frequency",
      "plants.species",
      "plants.plant_nickname"
    )
    .where({ "users.user_id": user_id });
}; //*

const findPlantById = (user) => {
  return db("plants")
    .join("users", "users.user_id", "plants.user_id")
    .where({
      "users.user_id": user.userid,
      "plants.plant_id": user.plantid,
    })
    .select("plants.species", "plants.h20_frequency", "plants.plant_nickname");
}; //*

const addNewUser = async (newUser) => {
  await db("users").insert(newUser);
  return findByUsername(newUser.username).select(
    "username",
    "phone_number",
    "user_id"
  );
}; //*

const deletePlant = async (user) => {
  const deletedPlant = await db("plants")
    .where({
      user_id: user.userid,
      plant_id: user.plantid,
    })
    .del();
  return deletedPlant;
}; //*

const addNewPlant = async (newPlant, userid) => {
  const plantToAdd = { ...newPlant, user_id: userid };
  const addedPlant = await db("plants").insert(plantToAdd);
  const foundNewPlant = await findPlantById({ userid, plantid: [addedPlant] });
  return foundNewPlant;
}; //*

// Pass in a whole, new, and updated plant object
const updatePlant = async (updatedPlant, plantid, userid) => {
  const updated = await db("plants")
    .where({ plant_id: plantid })
    .update({ ...updatedPlant });
  const foundUpdatedPlant = await findPlantById({ userid, plantid });
  return foundUpdatedPlant;
};

module.exports = {
  addNewUser,
  findByUsername,
  getAll,
  findAllPlantsByUserId,
  findUserById,
  findPlantById,
  deletePlant,
  addNewPlant,
  updatePlant,
};
