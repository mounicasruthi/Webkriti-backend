const { Client } = require("pg");

const client = new Client({connectionString: process.env.DB_URL, ssl: true });

module.exports = client;
