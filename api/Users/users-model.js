const db = require("../../data/dbConfig");

const getAll = () => {
  return db("users");
};

const findByUsername = (username) => {
  return db("users").where({ username: username });
};

const findById = (user_id) => {
  return db("users")
    .where({ user_id })
    .first()
    .select("username", "phone_number", "user_id");
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
  findById,
};
