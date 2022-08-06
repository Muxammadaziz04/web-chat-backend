const express = require('express')
const { getChats, getDialogs } = require('../controllers/dialogs.controller')

const Router = express.Router()


Router.get('/dialogs', getDialogs)


module.exports = Router