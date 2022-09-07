const express = require('express')
const { searchUsers } = require('../controllers/search.controller')

const Router = express.Router()

Router.get('/search', searchUsers)


module.exports = Router