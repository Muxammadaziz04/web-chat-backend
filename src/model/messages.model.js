const { fetchData } = require('../utils/postgres.js')

const getMessagesModel = async (dialog_id, user_id) => {
    try {
        const getMessagesQuery = `
        select * from messages where dialog_id = $1
        and array[$2] <@ (select dialog_members from dialogs where dialog_id = $1)
        order by created_at;
        `
        return await fetchData(getMessagesQuery, dialog_id, user_id)
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

module.exports = {
    getMessagesModel, postMessageModel
}