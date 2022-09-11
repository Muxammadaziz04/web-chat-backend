const express = require('express')
const { setAction, setLastSeem, getUserInfo, register, login, getUserInfoById, putUserInfo } = require('../controllers/users.controller')

const Router = express.Router()

Router.post('/register', register)
Router.post('/login', login)
Router.get('/userinfo', getUserInfo)
Router.get('/user/:user_id', getUserInfoById)
Router.put('/online', setAction)
Router.put('/leave', setLastSeem)
Router.put('/user', putUserInfo)


module.exports = Router