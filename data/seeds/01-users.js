const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  return knex("users")
    .truncate()
    .then(function () {
      return knex("users").insert([
        {
          user_id: 1,
          username: "username1",
          password: bcrypt.hashSync("password", 8),
          phone_number: "123.456.7890",
        },
        {
          user_id: 2,
          username: "username2",
          password: bcrypt.hashSync("password", 8),
          phone_number: "#2 seed phone number",
        },
      ]);
    });
};
