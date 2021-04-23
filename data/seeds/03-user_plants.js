exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user_plants")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("user_plants").insert([
        {
          id: 1,
          user_id: 1,
          plant_id: 2,
          plant_nickname: "Christmas tree plant",
        },
        { id: 2, user_id: 2, plant_id: 1, plant_nickname: "test #2" },
        { id: 3, user_id: 1, plant_id: 3, plant_nickname: "test #3" },
      ]);
    });
};
