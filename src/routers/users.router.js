const express = require('express')
const { setAction, setLastSeem, getUserInfo, regsiter, login, verify } = require('../controllers/users.controller')

const Router = express.Router()

Router.post('/register', regsiter)
Router.post('/login', login)
Router.post('/verify/:user_id', verify)
Router.get('/user/:user_id', getUserInfo)
Router.put('/online', setAction)
Router.put('/leave', setLastSeem)


module.exports = Router