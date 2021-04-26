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
      tbl.string("species", 256).notNullable();
      tbl.string("h20_frequency", 256).notNullable();
      tbl.string("plant_nickname", 128);
      tbl
        .integer("user_id")
        .unsigned()
        .references("users.user_id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("plants")
    .dropTableIfExists("users");
};
