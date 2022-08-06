const { fetchData } = require('../utils/postgres.js')

const getDialogsModel = async (user_id) => {
    try {
        const getUserDialogsQuery = `
        select * from (select * from 
            (
                select d.*, json_agg(u.*) as companion from dialogs as d 
                left join users as u 
                on array[concat(u.user_id, '')] <@ array[d.dialog_members] and u.user_id != $1
                group by d.dialog_id
            )
            as dialods
        where array[concat($1, '')] <@ dialog_members) as f left join (select * from messages order by created_at desc limit 1) as r on r.dialog_id = f.dialog_id;
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
select * from 
            (
                select d.*, json_agg(u.*) as companion, m.* from dialogs as d 
                left join users as u 
                on array[concat(u.user_id, '')] <@ array[d.dialog_members] and u.user_id != '0912eee5-1b21-4b4e-82c4-af4439be2d03'
                left join messages as m
                on d.dialog_id = m.dialog_id 
                group by d.dialog_id
            )
            as dialods
        where array[concat('0912eee5-1b21-4b4e-82c4-af4439be2d03', '')] <@ dialog_members;
`