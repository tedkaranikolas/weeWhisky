var connectionString = 'postgres://localhost:5432/whiskyDB';
var pg = require('pg');
//extra = sign added
if(process.env.DATABASE_URL !== undefined) {
    connectionString = process.env.DATABASE_URL;
    // connectionString = process.env.DATABASE_URL + 'ssl';
    pg.defaults.ssl = true;
} else {
    connectionString = 'postgres://localhost:5432/whiskyDB';
}

module.exports = connectionString;
