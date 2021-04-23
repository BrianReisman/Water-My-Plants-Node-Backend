exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user_plants")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("user_plants").insert([
        { id: 1, user_id: 1, plant_id: 2, nickname: "Christmas tree plant" },
      ]);
    });
};
