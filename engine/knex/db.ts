import { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: "postgresql://wooczak:kacper9@localhost:5432/goodjoedb",
  },

  production: {
    client: "pg",
    connection: process.env.DEV_CONNECTION, // TODO: Change to PROD connection string/object
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

const environment = process.env.NODE_ENV || "development";
const knexConfig = config[environment];

export default knexConfig;
