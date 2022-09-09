const sha256 = require('sha256')
const { fetchData, fetchOne } = require('../utils/postgres.js')

const registerModel = async ({first_name, email, password, last_name}) => {
    try {
        const loginQuery = `
        select * from users where email = $1
        `
        const user = await fetchData(loginQuery, email)

        if(user[0]){
            return {error: 'A user with this name exists'}
        }

        const registerQuery = `
        insert into users (first_name, email, password ${last_name ? ',last_name' : ''}) values ($1, $2, $3 ${last_name ? ',$4' : ''}) returning *
        `
        return await fetchOne(registerQuery, first_name, email, sha256(password), last_name)
    } catch (error) {
        console.log(error);
    }
}

const loginModel = async ({email, password}) => {
    try {
        const loginQuery = `
        select * from users where email = $1 and password = $2
        `
        return await fetchOne(loginQuery, email, sha256(password))
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

const deleteUserModel = async (user_id) => {
    try {
        const deleteUserQuery = `delete from user where user_id = $1`
        return await fetchOne(deleteUserQuery, user_id)
    } catch (error) {
        console.log(error);
    }
}

const sendCode = async(user_id) => {
    try {
        const checkQuery = `
        select * from waiting_users where user_id = $1
        `
        const user = await fetchData(checkQuery, user_id)

        if(user[0]){
            await fetchData(`delete from waiting_users where user_id = $1`, user_id)
        }

        const code = Math.floor(Math.random() * 9999)

        const sendCodeQuery = `
        insert into waiting_users (user_id, code) values ($1, $2) returning *
        `
        return await fetchOne(sendCodeQuery, user_id, code)
    } catch (error) {
        console.log(error);
    }
}

const checkCode = async({user_id}, {code}) => {
    try {
        const checkCodeQuery = `
        select * from waiting_users where user_id = $1 and code = $2
        `
        return await fetchData(checkCodeQuery, user_id, code)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    loginModel,
    registerModel,
    sendCode,
    checkCode,
    setActionModel,
    setlastSeemModel,
    getUserInfoModel,
    deleteUserModel
}