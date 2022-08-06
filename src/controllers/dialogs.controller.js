const { getDialogsModel } = require("../model/dialogs.model");

const getDialogs = async(req, res, next) => {
    try {
        const {user_id} = req.body

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


module.exports = {
    getDialogs
}