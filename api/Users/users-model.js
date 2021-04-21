const db = require("../../data/dbConfig");

const findByUsername = (username) => {
  return db("users")
    .select("username", "phone_number", "user_id")
    .where({ username: username });
};

const add = async (newUser) => {
  await db("users").insert(newUser);
  return findByUsername(newUser.username);
};

module.exports = {
  add,
};
