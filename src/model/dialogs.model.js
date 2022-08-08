const { fetchData } = require('../utils/postgres.js')

const getDialogsModel = async (user_id) => {
    try {
        const getUserDialogsQuery = `
        select * from (select * from 
            (
                select d.*, json_agg(u.*) as companion, json_agg(m.*) as last_message from dialogs as d 
                left join  (select * from messages order by created_at desc limit 1) as m 
                on m.dialog_id = d.dialog_id
                left join (select concat(first_name, ' ', last_name) as fullname, * from users) as u 
                on array[concat(u.user_id, '')] <@ array[d.dialog_members] and u.user_id != $1
                group by d.dialog_id
            ) 
            as dialogs
        where array[concat($1, '')] <@ dialog_members) as e;
        `
        return await fetchData(getUserDialogsQuery, user_id)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getDialogsModel
}

const l = `
select * from (select * from 
    (
        select d.*, json_agg(u.*) as companion, json_agg(m.*) from dialogs as d 
        left join (select * from messages order by created_at desc limit 1) as m 
        on m.dialog_id = d.dialog_id
        left join users as u 
        on array[concat(u.user_id, '')] <@ array[d.dialog_members] and u.user_id != '0912eee5-1b21-4b4e-82c4-af4439be2d03'
        group by d.dialog_id
    ) 
    as dialogs
where array[concat('0912eee5-1b21-4b4e-82c4-af4439be2d03', '')] <@ dialog_members) as e;
`