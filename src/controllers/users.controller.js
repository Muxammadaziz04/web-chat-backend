const { setActionModel, setlastSeemModel, getUserInfoModel, registerModel, loginModel, checkCode, sendCode, deleteUserModel } = require("../models/users.model");
const jwt = require("../utils/jwt");
const sendMail = require("../utils/sendToMail");

const regsiter = async(req, res, next) => {
    try {
        const response = await registerModel(req.body)
        if(response.error) return next(response)
        
        const code = await sendCode(response.user_id)
        if(code.error) {
            await deleteUserModel(response.user_id)
            return next(code)
        }
        sendMail(req.body.email, code.code)

        res.status(201).send({
            status: 201,
            message: 'please check your email',
            id: code.user_id
        })
    } catch (error) {
        console.log(error);
    }
}

const verify = async(req, res ,next) => {
    try {
        const response = await checkCode(req.params, req.body)
        if(response.error || !response.length) return next(response)

        const token = jwt.sign(response[0].user_id)

        res.status(201).send({
            status: 201,
            token
        })
    } catch (error) {
        console.log(error);
    }
}

const login = async(req, res, next) => {
    try {
        const response = await loginModel(req.body)
        if(response.error) return next(response)

        const token = jwt.sign(response.user_id)

        res.status(201).send({
            status: 201,
            data: {user: response, token}
        })
    } catch (error) {
        console.log(error);
    }
}

const setAction = async(req, res, next) => {
    try {
        const { user_id } = jwt.verify(req.headers.token)
        const response = await setActionModel(user_id)
        if(response.error) return next(response)

        res.status(201).send({
            status: 201,
            message: "successful updated",
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

const setLastSeem = async(req, res, next) => {
    try {
        const { user_id } = jwt.verify(req.headers.token)
        const date = new Date().toISOString()

        const response = await setlastSeemModel(date, user_id)
        if(response.error ) return next(response)

        res.status(201).send({
            status: 201,
            message: "successful updated",
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

const getUserInfo = async(req, res, next) => {
    try {
        const response = await getUserInfoModel(req.params)
        if(response.error) return next(response)

        res.status(200).send({
            status: 200,
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    regsiter,
    login,
    verify,
    setAction,
    setLastSeem,
    getUserInfo
}