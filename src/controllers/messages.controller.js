const { getDialogIdModel } = require("../models/dialogs.model")
const { getMessagesModel, postMessageModel, messageViewedModel } = require("../models/messages.model")
const { getUserInfoModel } = require("../models/users.model")
const jwt = require("../utils/jwt")

const getMessages = async(req, res, next) => {
    try {
        const { companion_id } = req.params
        const { user_id } = jwt.verify(req.headers.token)
        const messages = await getMessagesModel(user_id, companion_id)
        const dialog_id = await getDialogIdModel(user_id, companion_id)
        const user = await getUserInfoModel(companion_id)

        if(messages.error) return next(messages)

        res.status(200).send({
            status: 200,
            data: { messages, user: user, dialog_id}
        })
    } catch (error) {
        console.log(error);
    }
}

const postMessage = async(req, res, next) => {
    try {
        const { dialog_id } = req.params
        const { message_body } = req.body
        const { user_id } = jwt.verify(req.headers.token)
        
        const response = await postMessageModel(message_body, user_id, dialog_id)

        if(response.error) return next(response)

        res.status(201).send({
            status: 201,
            message: "message was successfully written",
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

const messageViewed = async(req, res, next) => {
    try {
        const { user_id } = jwt.verify(req.headers.token)
        const { message_id } = req.params

        const response = await messageViewedModel(message_id, user_id)

        if(response.error || !response.length) return next(response)

        res.status(200).send({
            status: 200,
            message: "message was successfully updated",
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getMessages, postMessage, messageViewed
}