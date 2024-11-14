import { type Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("journey", function (table) {
    table.string("user_id").notNullable();
    table.string("from_destination").notNullable();
    table.string("to_destination").notNullable();
    table.specificType("dates", "integer[]").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("journey");
}
