exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments('user_id');
    tbl.string("username", 128).notNullable().unique();
    tbl.string("password", 256).notNullable();
    tbl.string("phone_number").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
