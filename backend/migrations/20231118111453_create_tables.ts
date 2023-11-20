import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.string('email', 255);
        table.json('roles');
        table.text('password');
    });

    await knex.schema.createTable('feed', (table) => {
        table.increments('id').primary();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.text('url');
        table.boolean('isVerified').defaultTo(false);
    });

    await knex.schema.createTable('session', (table) => {
        table.increments('id').primary();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.text('sessionId');
        table.integer('userId');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users');
    await knex.schema.dropTableIfExists('feed');
    await knex.schema.dropTableIfExists('session');
}