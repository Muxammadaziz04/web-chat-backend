const { fetchData } = require('../utils/postgres.js')

const loginModel = async () => {
    try {
        const loginQuery = ``

        return await fetchData(loginQuery)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    loginModel
}