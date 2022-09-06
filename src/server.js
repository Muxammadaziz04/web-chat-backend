const express = require('express')
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors')

const chatsRouter = require('./routers/dialogs.router.js')
const messagesRouter = require('./routers/messages.router.js')
const usersRouter = require('./routers/users.router.js');
const { postOnlineUserModel, getOnlineUserModel, deleteOnlineUserModel } = require('./model/onlineUsers.model.js');
const { disconnect, join, sendMessage, changeMsgStatus } = require('./soket/index.js');

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer);


app.use(express.json())
app.use(cors())
app.use(chatsRouter)
app.use(messagesRouter)
app.use(usersRouter)

app.use((error, req, res, next) => {
    return res.send({ error: error.error?.message || "somethink went wrong" })
})

io.on("connection", (socket) => {
    socket.on('USER_JOIN', data => join(data, socket, io))
    socket.on('disconnect', () => disconnect(socket, io));
    socket.on('SEND_MESSAGE', data => sendMessage(data, io, socket))
    socket.on('MESSAGE_VIEWED', data => changeMsgStatus(data, io))
})

httpServer.listen(process.env.PORT || 5000, () => {
    console.log(`Server is run on ${process.env.PORT || 5000} port`);
})


// Muhammadaziz 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDkxMmVlZTUtMWIyMS00YjRlLTgyYzQtYWY0NDM5YmUyZDAzIiwiaWF0IjoxNjU5NzcxMzcwfQ.M_NIs2m20ZONK2x4hz2xPNFKAA-5lTUdWr9NzvV1tVE'
// Ali 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDdmNDgxNDQtYjM5OS00MjljLTgzYWUtYmU4ZmE0MDI5YTU1IiwiaWF0IjoxNjU5NzcxMzQwfQ.oJrfYc8YY9ylH5lBJvLqmLTut5G3cDHuzEAca-4NTXo'
// Said 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZWUxNGIzZjctNGQxNC00YWVmLTg5OTMtM2U1MzEyYjFhMGE3IiwiaWF0IjoxNjU5NzcxMzE2fQ.hmcMMUjYtdRO-bSmYmqKKjD9PKYpWaDUvEk2KG4ubNA'