const { getDialogsModel } = require("../models/dialogs.model");
const { searchModel } = require("../models/search.model");
const jwt = require("../utils/jwt");

const searchUsers = async(req, res, next) => {
    try {
        const { user_id } = jwt.verify(req.headers.token)
        const response = req.query.value ? await searchModel(user_id, req.query) : await getDialogsModel(user_id)

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
    searchUsers
}