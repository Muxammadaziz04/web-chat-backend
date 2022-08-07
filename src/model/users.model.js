const { fetchData } = require('../utils/postgres.js')

const loginModel = async () => {
    try {
        const loginQuery = ``

        return await fetchData(loginQuery)
    } catch (error) {
        console.log(error);
    }
}

const setActionModel = async (user_id) => {
    try {
        const setActionQuery = `update users set user_action = 'online' where user_id = $1 returning *`

        return await fetchData(setActionQuery, user_id)
    } catch (error) {
        console.log(error);
    }
}

const setlastSeemModel = async (date, user_id) => {
    try {
        const setLastSeemQuery = `update users set last_seem = $1, user_action = 'offline' where user_id = $2 returning *`

        return await fetchData(setLastSeemQuery, date, user_id)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    loginModel, 
    setActionModel, 
    setlastSeemModel
}