exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments("user_id");
      tbl.string("username", 128).notNullable().unique();
      tbl.string("password", 256).notNullable();
      tbl.string("phone_number").notNullable();
    })
    .createTable("plants", (tbl) => {
      tbl.increments("plant_id");
      tbl.string("species", 256).notNullable().unique();
      tbl.string("h20_frequency", 256).notNullable();
    })
    .createTable("user_plants", (tbl) => {
      tbl.increments();
      tbl
        .integer("user_id")
        .unsigned()
        .references("users.user_id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("plant_id")
        .unsigned()
        .references("plants.plant_id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.string("plant_nickname", 128);
    });
};

exports.down = function (knex) {
  // !!!REMEMBER TO DROP IN REVERSE ORDER
  return knex.schema
    .dropTableIfExists("user_plants")
    .dropTableIfExists("plants")
    .dropTableIfExists("users");
};
