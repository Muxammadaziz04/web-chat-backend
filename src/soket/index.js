const { postOnlineUserModel, getOnlineUserModel, deleteOnlineUserModel } = require("../models/onlineUsers.model");

const join = async (data, socket, io) => {
    try {
        socket.user_id = data.user_id
        socket.companions = data.companions
        await postOnlineUserModel(socket.user_id, data.id)
        socket.companions?.forEach(async (user_id) => {
            const [onlineUser] = await getOnlineUserModel(user_id)
            if (onlineUser?.socket_id) {
                io.to(onlineUser.socket_id).emit('NEW_USER_ONLINE', { user_id: socket.user_id, status: 'online' })
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const disconnect = async (socket, io) => {
    try {
        const [deletedUser] = await deleteOnlineUserModel(socket.user_id)
        if (deletedUser?.user_id === socket.user_id) {
            socket.companions?.forEach(async (user_id) => {
                const [onlineUser] = await getOnlineUserModel(user_id)
                if(onlineUser?.socket_id){
                    io.to(onlineUser?.socket_id).emit('USER_EXIT', { user_id: socket.user_id, status: 'offline' })
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const sendMessage = async (data, io, socket) => {
    try {
        const [companion] = await getOnlineUserModel(data.companion_id)
        if(companion?.socket_id){
            io.to(companion.socket_id).emit('NEW_MESSAGE', {data: data.data, companion_id: socket.user_id})
        }
    } catch (error) {
        console.log(error);
    }
}

const changeMsgStatus = async(data, io) => {
    try {
        const [companion] = await getOnlineUserModel(data.companion_id)
        if(companion?.socket_id){
            io.to(companion.socket_id).emit('CHANGE_MSG_STATUS', {message_id: data.message_id})
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    join,
    disconnect,
    sendMessage,
    changeMsgStatus
}