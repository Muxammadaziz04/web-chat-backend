const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 5000

const pgConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
    ssl: {
        rejectUnauthorized: false,
    }
}

const firebaseConfig = {
    apiKey: "AIzaSyBqNBqhnYejHBWsj3CoxHLWBYHplKd7sgw",
    authDomain: "web-chat-9c26d.firebaseapp.com",
    projectId: "web-chat-9c26d",
    storageBucket: "web-chat-9c26d.appspot.com",
    messagingSenderId: "295510934974",
    appId: "1:295510934974:web:7e1c4ae606990a1d6be5ef",
    measurementId: "G-LBV5J9QJEZ"
  };

module.exports = {
    PORT, pgConfig, firebaseConfig
}