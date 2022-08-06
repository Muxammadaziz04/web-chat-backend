const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 5000

const pgConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT
}

module.exports = {
    PORT, pgConfig
}