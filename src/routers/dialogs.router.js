const express = require('express')
const { getChats, getDialogs } = require('../controllers/dialogs.controller')

const Router = express.Router()


Router.post('/dialogs', getDialogs)


module.exports = Router