const sha256 = require('sha256')
const { fetchData, fetchOne } = require('../utils/postgres.js')

const registerModel = async ({ first_name, email, password, last_name }) => {
    try {
        const loginQuery = `
        select * from users where email = $1
        `
        const user = await fetchData(loginQuery, email)

        if (user[0]) {
            return { error: 'A user with this email exists' }
        }

        const registerQuery = `
        insert into users (first_name, email, password ${last_name ? ',last_name' : ''}) values ($1, $2, $3 ${last_name ? ',$4' : ''}) returning *
        `
        return await fetchOne(registerQuery, first_name, email, sha256(password), last_name)
    } catch (error) {
        console.log(error);
    }
}

const loginModel = async ({ email, password }) => {
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

const getUserInfoByIdModel = async ({ user_id }) => {
    try {
        const getUserInfoQuery = `select *, concat(first_name, ' ', last_name) as fullname from users where user_id = $1`
        return await fetchOne(getUserInfoQuery, user_id)
    } catch (error) {
        console.log(error);
    }
}

const putUserModel = async (body, user_id) => {
    try {
        const oldUserQuery = `select * from users where user_id = $1`
        const oldUser = await fetchOne(oldUserQuery, user_id)

        if(!oldUser) return null

        const { first_name, last_name, username, user_avatar, user_info } = {
            ...oldUser,
            ...body
        }

        const arr =  { first_name, last_name, username, user_avatar, user_info }
        const newArr = Object.entries(arr).filter(arg => arg[1] === null || arg[1] === undefined ? false : true)
        let query = []
        newArr.forEach((arg, index) => {
            index +=2
            query.push(`${arg[0]} = $${index}`);
        })

        const putUserQuery = `update users set
        ${query.join(',')}
        where user_id = $1 returning *
        `
        return await fetchOne(putUserQuery, user_id, first_name, last_name, username, user_avatar, user_info)
    } catch (error) {
        console.log(error);
    }
}

const deleteUserModel = async (user_id) => {
    try {
        const deleteUserQuery = `delete from user where user_id = $1`
        return await fetchOne(deleteUserQuery, user_id,)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    loginModel,
    registerModel,
    setActionModel,
    setlastSeemModel,
    getUserInfoModel,
    deleteUserModel,
    getUserInfoByIdModel,
    putUserModel
}