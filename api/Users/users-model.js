const db = require("../../data/dbConfig");

const findByUsername = (username) => {
  return db("users").where({ username: username });
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
};
