const express = require('express')
const { setAction, setLastSeem } = require('../controllers/users.controller')

const Router = express.Router()


Router.put('/online', setAction)
Router.put('/leave', setLastSeem)


module.exports = Router