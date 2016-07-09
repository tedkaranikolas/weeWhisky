var connectionString = 'postgres://localhost:5432/scotchAdmin';
//extra = sign added
if(process.env.DATABASE_URL !== undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/scotchAdmin';
}

module.exports = connectionString;
