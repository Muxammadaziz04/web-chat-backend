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