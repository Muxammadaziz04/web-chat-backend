const { postOnlineUserModel, getOnlineUserModel, deleteOnlineUserModel } = require("../models/onlineUsers.model");
const { setActionModel, setlastSeemModel } = require("../models/users.model");
const jwt = require("../utils/jwt");

const join = async (data, socket, io) => {
    try {
        socket.user_id = data.user_id
        socket.companions = data.companions
        socket.user_id = jwt.verify(data.token).user_id
        await postOnlineUserModel(socket.user_id, socket.id)
        socket.companions?.forEach(async (user_id) => {
            const onlineUser = await getOnlineUserModel(user_id)
            if (onlineUser && onlineUser[0]?.socket_id) {
                io.to(onlineUser[0].socket_id).emit('NEW_USER_ONLINE', { user_id: socket.user_id, status: 'online' })
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const disconnect = async (socket, io) => {
    try {
        const date = new Date().toISOString()
        await setlastSeemModel(date, socket.user_id)
        await deleteOnlineUserModel(socket.user_id)
        socket.companions?.forEach(async (user_id) => {
            const onlineUser = await getOnlineUserModel(user_id)
            if (onlineUser && onlineUser[0]?.socket_id) {
                io.to(onlineUser[0]?.socket_id).emit('USER_EXIT', { user_id: socket.user_id, status: 'offline' })
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const sendMessage = async (data, io, socket) => {
    try {
        const companion = await getOnlineUserModel(data.companion_id)
        if (companion[0]?.socket_id) {
            io.to(companion[0].socket_id).emit('NEW_MESSAGE', data)
        }
    } catch (error) {
        console.log(error);
    }
}

const changeMsgStatus = async (data, io) => {
    try {
        const companion = await getOnlineUserModel(data.companion_id)
        if (companion[0]?.socket_id) {
            io.to(companion[0].socket_id).emit('CHANGE_MSG_STATUS', { message_id: data.message_id })
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