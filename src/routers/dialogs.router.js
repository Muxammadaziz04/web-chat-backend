const express = require('express')
const { getDialogs } = require('../controllers/dialogs.controller.js')

const Router = express.Router()


Router.get('/dialogs', getDialogs)


module.exports = Router