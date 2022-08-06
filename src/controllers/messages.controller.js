const { getMessagesModel, postMessageModel } = require("../model/messages.model")

const getMessages = async(req, res, next) => {
    try {
        const { dialog_id } = req.params
        const { user_id } = req.body
        
        const response = await getMessagesModel(dialog_id, user_id)

        if(response.error) return next(response)

        res.status(200).send({
            status: 200,
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

const postMessage = async(req, res, next) => {
    try {
        const { dialog_id } = req.params
        const { user_id, message_body } = req.body
        
        const response = await postMessageModel(message_body, user_id, dialog_id)

        if(response.error || !response.length) return next(response)

        res.status(201).send({
            status: 201,
            message: "message was successfully written",
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getMessages, postMessage
}