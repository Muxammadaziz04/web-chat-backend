const express = require('express')
const { getDialogs, postDialog } = require('../controllers/dialogs.controller.js')

const Router = express.Router()


Router.post('/dialog', postDialog)
Router.get('/dialogs', getDialogs)


module.exports = Router