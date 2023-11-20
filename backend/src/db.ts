import { knex} from 'knex';
import * as knexconfig from '../knexfile';

const db = knex(knexconfig);

// mysql.types.setTypeParser(20, 'text', parseInt);

export default db;