const express = require('express')

const chatsRouter = require('./routers/dialogs.router.js')
const messagesRouter = require('./routers/messages.router.js')

const app = express()


app.use(express.json())
app.use(chatsRouter)
app.use(messagesRouter)



app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is run on ${process.env.PORT || 5000} port`);
})


// Muhammadaziz 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDkxMmVlZTUtMWIyMS00YjRlLTgyYzQtYWY0NDM5YmUyZDAzIiwiaWF0IjoxNjU5NzcxMzcwfQ.M_NIs2m20ZONK2x4hz2xPNFKAA-5lTUdWr9NzvV1tVE'
// Ali 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDdmNDgxNDQtYjM5OS00MjljLTgzYWUtYmU4ZmE0MDI5YTU1IiwiaWF0IjoxNjU5NzcxMzQwfQ.oJrfYc8YY9ylH5lBJvLqmLTut5G3cDHuzEAca-4NTXo'
// Said 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZWUxNGIzZjctNGQxNC00YWVmLTg5OTMtM2U1MzEyYjFhMGE3IiwiaWF0IjoxNjU5NzcxMzE2fQ.hmcMMUjYtdRO-bSmYmqKKjD9PKYpWaDUvEk2KG4ubNA'