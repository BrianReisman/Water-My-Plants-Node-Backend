const db = require("../../data/dbConfig");

const getAll = () => {
  return db("users");
};

const findUserById = (user_id) => {
  return db("users").where({ user_id }).first()
};

const findByUsername = (username) => {
  return db("users").where({ username: username })
};

const findAllPlantsByUserId = (user_id) => {
  return db("user_plants")
    .join("users", "users.user_id", "user_plants.user_id")
    .join("plants", "plants.plant_id", "user_plants.plant_id")
    .select(
      "plants.h20_frequency",
      "plants.species",
      "user_plants.plant_nickname"
    )
    .where({ "users.user_id": user_id });
};

const add = async (newUser) => {
  await db("users").insert(newUser);
  return findByUsername(newUser.username).select(
    "username",
    "phone_number",
    "user_id"
  );
};

module.exports = {
  add,
  findByUsername,
  getAll,
  findAllPlantsByUserId,
  findUserById,
};
