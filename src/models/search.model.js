const { fetchOne } = require("../utils/postgres");


const searchModel = async (user_id, { value }) => {
    try {
        const searchQuery = `
        select  
            (   
                select json_agg(u.*) as dialogs from users as u where 
                user_dialogs @> (select user_dialogs from users where user_id = $1)
                and (
                    first_name ilike concat($2::text, '%')
                    or last_name ilike concat($2, '%')
                    or username ilike concat($2, '%')
                )
                and $1 != user_id
            ),
            (
                select json_agg(d.*) as finded_users from users as d where 
                username ilike concat($2, '%') 
                and true != user_dialogs @> (select user_dialogs from users where user_id = $1)
            )
        `
        return await fetchOne(searchQuery, user_id, value)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    searchModel
}