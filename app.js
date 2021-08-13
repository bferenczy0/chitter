require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000;
const session = require('express-session')
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: true}))
app.use(session({
    secret: 'super top secret',
    resave: false,
    saveUninitialized: true,
}))

const chitterRouter = require('./routes/chitter')
const userRouter = require('./routes/user')
const peepRouter = require('./routes/createPeep')
const replyRouter = require('./routes/reply')

app.use('/', chitterRouter)
app.use('/', userRouter)
app.use('/', peepRouter)
app.use('/', replyRouter)

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
})