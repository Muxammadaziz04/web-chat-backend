const { fetchData } = require('../utils/postgres.js')

const postOnlineUserModel = async (user_id, socket_id) => {
    try {
        const postOnlineUserQuery = `
        insert into online_users(user_id, socket_id) values ($1, $2) returning *
        `
        return await fetchData(postOnlineUserQuery, user_id, socket_id)
    } catch (error) {
        console.log(error);
    }
}

const getOnlineUserModel = async (user_id) => {
    try {
        const getOnlineUserQuery = `
        select * from online_users where user_id = $1
        `
        return await fetchData(getOnlineUserQuery, user_id)
    } catch (error) {
        console.log(error);
    }
}

const deleteOnlineUserModel = async (user_id) => {
    try {
        const deleteOnlineUserQuery = `
        delete from online_users where user_id = $1 returning *
        `
        return await fetchData(deleteOnlineUserQuery, user_id)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    postOnlineUserModel, 
    getOnlineUserModel,
    deleteOnlineUserModel
}