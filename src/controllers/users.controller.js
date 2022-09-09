const { setActionModel, setlastSeemModel, getUserInfoModel } = require("../models/users.model");
const jwt = require("../utils/jwt");

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
    setAction,
    setLastSeem,
    getUserInfo
}