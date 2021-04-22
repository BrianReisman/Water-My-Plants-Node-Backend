const bcrypt = require('bcryptjs')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          user_id: 1,
          username: "testUser",
          password: bcrypt.hashSync("password", 8),
          phone_number: "123.456.7890",
        },
      ]);
    });
};
