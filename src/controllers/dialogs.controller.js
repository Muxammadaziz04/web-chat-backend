const { getDialogsModel, postDialogModel } = require("../models/dialogs.model");
const jwt = require("../utils/jwt");

const getDialogs = async(req, res, next) => {
    try {
        const { user_id } = jwt.verify(req.headers.token)
        const response = await getDialogsModel(user_id)

        if(response.error) return next(response)

        res.status(200).send({
            status: 200,
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

const postDialog = async(req, res, next) => {
    try {
        const { user_id } = jwt.verify(req.headers.token)
        const response = await postDialogModel(user_id, req.body.companion_email)

        if(response?.error) return next(response)

        res.status(200).send({
            status: 201,
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getDialogs,
    postDialog
}