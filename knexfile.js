// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    migrations: { directory: "./data/migrations" },
    seeds: { directory: "./data/seeds" },
    connection: {
      filename: "./data/user.db3",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
  },

  production: {
    client: "sqlite3",
    useNullAsDefault: true,
    migrations: { directory: "./data/migrations" },
    seeds: { directory: "./data/seeds" },
    pool: {
      afterCreate: (conn, done) => conn.run("PRAGMA foreign_keys = ON", done),
    },
    connection: {
      filename: "./data/waterMyPlantsDBProduction.db3",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },
};
