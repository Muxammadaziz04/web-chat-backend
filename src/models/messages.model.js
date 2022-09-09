const { fetchData, fetchOne } = require('../utils/postgres.js')

const getMessagesModel = async (user_id, companion_id) => {
    try {
        const getMessagesQuery = `
        select * from messages 
        where dialog_id = (select dialog_id from dialogs where array[$1::uuid, $2::uuid] <@ dialog_members and array_length(dialog_members, 1) = 2)
        order by created_at
        `
        return await fetchData(getMessagesQuery, user_id, companion_id)
    } catch (error) {
        console.log(error);
    }
}

const postMessageModel = async (message_body, user_id, companion_id) => {
    try {
        const postMessageQuery = `
        insert into messages (message_body, message_from, dialog_id) values($1, $2::uuid, (select dialog_id from dialogs where array[$2::uuid, $3::uuid] <@ dialog_members)) returning *
        `
        return await fetchOne(postMessageQuery, message_body, user_id, companion_id)
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
        array[(select dialog_id from messages where message_id = $1)] <@ (select user_dialogs from users where user_id = $2)
        returning *
        `
        return await fetchOne(messageViewedQuery, message_id, user_id)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getMessagesModel, postMessageModel, messageViewedModel
}