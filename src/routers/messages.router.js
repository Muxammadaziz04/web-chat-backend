const express = require('express')
const { getMessages, postMessage } = require('../controllers/messages.controller')

const Router = express.Router()


Router.get('/messages/:dialog_id', getMessages)
Router.post('/message/:dialog_id', postMessage)


module.exports = Router