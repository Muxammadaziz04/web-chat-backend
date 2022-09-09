const { fetchData, fetchOne } = require('../utils/postgres.js')

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
        return await fetchOne(setActionQuery, user_id)
    } catch (error) {
        console.log(error);
    }
}

const setlastSeemModel = async (date, user_id) => {
    try {
        const setLastSeemQuery = `update users set last_seem = $1, user_action = 'offline' where user_id = $2 returning *`
        return await fetchOne(setLastSeemQuery, date, user_id)
    } catch (error) {
        console.log(error);
    }
}

const getUserInfoModel = async (user_id) => {
    try {
        const getUserInfoQuery = `select *, concat(first_name, ' ', last_name) as fullname from users where user_id = $1`
        return await fetchOne(getUserInfoQuery, user_id)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    loginModel,
    setActionModel,
    setlastSeemModel,
    getUserInfoModel
}