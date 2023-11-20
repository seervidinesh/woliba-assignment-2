import knex from '../../src/db';

export async function resetDB() {
    await knex('users').truncate()
    await knex('feed').truncate()
    await knex('session').truncate()
}