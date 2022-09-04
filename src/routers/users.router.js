const express = require('express')
const { setAction, setLastSeem, getUserInfo } = require('../controllers/users.controller')

const Router = express.Router()

Router.get('/user/:user_id', getUserInfo)
Router.put('/online', setAction)
Router.put('/leave', setLastSeem)


module.exports = Router