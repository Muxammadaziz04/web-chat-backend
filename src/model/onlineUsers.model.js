const { fetchData } = require('../utils/postgres.js')

const postOnlineUserModel = async (user_email, user_id) => {
    try {
        const postOnlineUserQuery = `
        insert into online_users(user_id, user_email) values ($1, $2) returning *
        `
        return await fetchData(postOnlineUserQuery, user_id, user_email)
    } catch (error) {
        console.log(error);
    }
}

const getOnlineUserModel = async (user_email) => {
    try {
        const getOnlineUserQuery = `
        select * from online_users where user_email = $1
        `
        return await fetchData(getOnlineUserQuery, user_email)
    } catch (error) {
        console.log(error);
    }
}

const deleteOnlineUserModel = async (user_email) => {
    try {
        const deleteOnlineUserQuery = `
        delete from online_users where user_email = $1 returning *
        `
        return await fetchData(deleteOnlineUserQuery, user_email)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    postOnlineUserModel, 
    getOnlineUserModel,
    deleteOnlineUserModel
}