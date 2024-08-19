import knexConstructor from 'knex';
import { ConnectSessionKnexStore } from "connect-session-knex";
import knex from "./db";

export const store = new ConnectSessionKnexStore({
  knex: knexConstructor(knex),
  tableName: "sessions",
});
