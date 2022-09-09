const { fetchOne } = require('../utils/postgres.js')

const getDialogsModel = async (user_id) => {
    try {
        const getUserDialogsQuery = `
        select json_agg(e.*) as dialogs from (select * from 
            (
                select 
                    d.*, 
                    json_agg(u.*) as companion, 
                    json_agg(m.*) as last_message ,
                    (select count(*) from messages where dialog_id = d.dialog_id and message_from != $1 and viewed = false) as notificate
                from dialogs as d 
                left join  (select distinct on (dialog_id) * from messages order by dialog_id, created_at desc) as m 
                on m.dialog_id = d.dialog_id
                left join (select concat(first_name, ' ', last_name) as fullname, * from users) as u 
                on array[u.user_id] <@ d.dialog_members and u.user_id != $1
                group by d.dialog_id
            ) 
            as dialogs
        where array[$1] <@ dialog_members
        order by last_message->0->>'created_at' desc nulls last
        ) as e
        `
        return await fetchOne(getUserDialogsQuery, user_id)
    } catch (error) {
        console.log(error);
    }
}

const getDialogIdModel = async(user_id, companion_id) => {
    try {
        const getDialogIdQuery = `select dialog_id from dialogs where array[$1::uuid, $2::uuid] <@ dialog_members and array_length(dialog_members, 1) = 2`
        return await fetchOne(getDialogIdQuery, user_id, companion_id)
    } catch (error) {
        console.log(error);
    }
}

const postDialogModel = async () => {
    try {
        const postDialogQuery = `
        
        `
        return await fetchOne(postDialogQuery)
    } catch (error) {
        
    }
}

module.exports = {
    getDialogsModel,
    getDialogIdModel
}