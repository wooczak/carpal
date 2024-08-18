import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", function (table) {
    table.uuid("id").primary(); // UUID primary key
    table.string("name").notNullable(); // Name column
    table.string("surname").notNullable(); // Surname column
    table.string("email").unique().notNullable(); // Unique email column
    table.string("password").notNullable(); // Password column
    table.timestamps(true, true); // Created at and updated at timestamps
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
