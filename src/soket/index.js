const { postOnlineUserModel, getOnlineUserModel, deleteOnlineUserModel } = require("../model/onlineUsers.model");

const join = (data, socket, io) => {
    try {
        socket.email = data.email
        socket.companions = data.companions
        postOnlineUserModel(socket.email, data.id)
            .then(() => {
                socket.companions?.forEach((user) => {
                    getOnlineUserModel(user)
                        .then(res => {
                            if (res[0]?.user_id) {
                                io.to(res[0]?.user_id).emit('NEW_USER_ONLINE', { user: socket.email })
                            }
                        })
                })
            })
    } catch (error) {
        console.log(error);
    }
}

const disconnect = (socket, io) => {
    try {
        deleteOnlineUserModel(socket.email)
            .then((res) => {
                if (res[0]?.user_email == socket.email) {
                    socket.companions?.forEach(async (user) => {
                        let res = await getOnlineUserModel(user)
                        io.to(res[0]?.user_id).emit('USER_EXIT', { user: socket.email })
                    })
                }
            })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    join,
    disconnect
}