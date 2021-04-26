exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("plants")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("plants").insert([
        {
          plant_id: 1,
          species: "Abelmoschus Medik",
          h20_frequency: "twice weekly",
          plant_nickname: "nickname",
          user_id: 1,
        },
        {
          plant_id: 2,
          species: "Abutilon Mill",
          h20_frequency: "once a day",
          plant_nickname: "nickname",
          user_id: 1,
        },
        {
          plant_id: 3,
          species: "Acalypha L",
          h20_frequency: "every other day",
          plant_nickname: "nickname",
          user_id: 1,
        },
        {
          plant_id: 4,
          species: "Acalypha L alt.",
          h20_frequency: "every day",
          plant_nickname: "nickname for plantw/id 4",
          user_id: 2,
        },
      ]);
    });
};
