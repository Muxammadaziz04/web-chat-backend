const express = require('express')
const { getMessages, postMessage, messageViewed } = require('../controllers/messages.controller')

const Router = express.Router()


Router.get('/messages/:dialog_id', getMessages)
Router.post('/message/:dialog_id', postMessage)
Router.put('/viewed/:message_id', messageViewed)


module.exports = Router