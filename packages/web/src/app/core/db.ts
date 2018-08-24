import Dexie from 'dexie';

export const basketTableName = 'asket';

const schema: { [key: string]: string} = {}
schema[basketTableName] = 'id,date';
// Just the indexed columns

export const db = new Dexie('klangdb');
db.version(1).stores(schema);
