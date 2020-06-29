const express = require('express')
const cors = require('cors')

const postRouter = require('./routes/post')
const userRouter = require('./routes/user')

const db = require('./models')
const passportConfig = require('./passport')

const app = express()

db.sequelize.sync().then(() => {
    console.log('db연결성공')
}).catch(console.error)
passportConfig()

app.use(cors({
    origin: true,
    credentials: false,
}))
app.use(express.json()) // 프론트에서 보낸 데이터를 req.body에 넣어주는 역할
app.use(express.urlencoded({ extended: true })) // 프론트에서 보낸 데이터를 req.body에 넣어주는 역할

app.get('/', (req, res) => {
    res.send('hello express')
})

app.get('/api', (req, res) => {
    res.send('hello api')
})

app.use('/post', postRouter)
app.use('/user', userRouter)

// const server = http.createServer((req, res) => {
//     console.log(req.url, req)
//     res.write('write')
//     res.end('hello node')
// })

app.listen(3065, () => {
    console.log('서버 실행 중!!')
})