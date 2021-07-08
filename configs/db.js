const { Client } = require("pg");

const client = new Client({connectionString: process.env.DB_URL, ssl: {rejectUnauthorized: false} });

module.exports = client;
