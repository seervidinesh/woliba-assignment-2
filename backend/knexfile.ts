// Update with your config settings.

import { ConnectionStringParser } from "connection-string-parser";
import config from './src/config';

module.exports = {
    client: 'mysql',
    connection: config.DB_CONNECTION_URI || '',
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: 'knex_migrations',
        extension: 'ts'
    },
};
