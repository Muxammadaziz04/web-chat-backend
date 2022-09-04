const { fetchData } = require('../utils/postgres.js')

const getMessagesModel = async (user_id, companion_id) => {
    try {
        const getMessagesQuery = `
        select * from messages 
        where dialog_id = (select dialog_id from dialogs where array[$1, $2] <@ dialog_members and array_length(dialog_members, 1) = 2)
        order by created_at
        `
        return await fetchData(getMessagesQuery, user_id, companion_id)
    } catch (error) {
        console.log(error);
    }
}

const postMessageModel = async (message_body, user_id, dialog_id) => {
    try {
        const postMessageQuery = `
        insert into messages (message_body, message_from, dialog_id) values($1, $2, $3) returning *
        `
        return await fetchData(postMessageQuery, message_body, user_id, dialog_id)
    } catch (error) {
        console.log(error);
    }
}

const messageViewedModel = async (message_id, user_id) => {
    try {
        const messageViewedQuery = `
        update messages set viewed = true where 
        message_id = $1 and 
        message_from != $2 and 
        array[concat((select dialog_id from messages where message_id = $1), '')] <@ (select user_chats from users where user_id = $2)
        returning *
        `
        return await fetchData(messageViewedQuery, message_id, user_id)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getMessagesModel, postMessageModel, messageViewedModel
}