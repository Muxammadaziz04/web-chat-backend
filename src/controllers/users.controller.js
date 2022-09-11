const { setActionModel, setlastSeemModel, getUserInfoModel, registerModel, loginModel, deleteUserModel, getUserInfoByIdModel, putUserModel } = require("../models/users.model");
const { uploadimg } = require("../utils/firebase");
const jwt = require("../utils/jwt");

const register = async(req, res, next) => {
    try {
        const response = await registerModel(req.body)
        if(response.error) return next(response)
        
        const token = jwt.sign({user_id: response?.user_id})

        res.status(201).send({
            status: 201,
            token,
            user: response
        })
    } catch (error) {
        console.log(error);
    }
}

const login = async(req, res, next) => {
    try {
        const response = await loginModel(req.body)
        if(response?.error || !response) return res.send({error: "wrong email or pasword"})

        const token = jwt.sign({user_id: response?.user_id})

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
        const {user_id} = jwt.verify(req.headers.token)
        const response = await getUserInfoModel(user_id)
        if(response.error) return next(response)

        res.status(200).send({
            status: 200,
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

const getUserInfoById = async(req, res, next) => {
    try {
        const response = await getUserInfoByIdModel(req.params)
        if(response.error) return next(response)

        res.status(200).send({
            status: 200,
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

const putUserInfo = async(req, res, next) => {
    try {
        const file = req.files?.img
        if (file?.name && file?.data) {
            const fileName = Date.now() + file?.name
            const path = `avatar/${fileName}`
            req.body.user_avatar = await uploadimg(file, path, res)
        }
        const {user_id} = jwt.verify(req.headers.token)
        const response = await putUserModel(req.body, user_id)
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
    register,
    login,
    setAction,
    setLastSeem,
    getUserInfo,
    getUserInfoById,
    putUserInfo
}