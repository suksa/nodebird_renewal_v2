const express = require('express')
const postRouter = require('./routes/post')
const db = require('./models')
const app = express()

db.sequelize.sync().then(() => {
    console.log('db연결성공')
}).catch(console.error)

app.get('/', (req, res) => {
    res.send('hello express')
})

app.get('/api', (req, res) => {
    res.send('hello api')
})

app.use('/post', postRouter)

// const server = http.createServer((req, res) => {
//     console.log(req.url, req)
//     res.write('write')
//     res.end('hello node')
// })

app.listen(3065, () => {
    console.log('서버 실행 중!!')
})