import { type Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", function (table) {
    table.boolean("keep_me_signed_in");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", function (table) {
    table.dropColumn("keep_me_signed_in");
  });
}
