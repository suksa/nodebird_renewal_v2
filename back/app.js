const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('hello express')
})

app.get('/api', (req, res) => {
    res.send('hello api')
})

app.post('/api/post', (req, res) => {
    res.json([
        {id: 1, content: 'hello'},
    ])
})

app.delete('/api/post', (req, res) => {
    res.json([
        {id: 1},
    ])
})

// const server = http.createServer((req, res) => {
//     console.log(req.url, req)
//     res.write('write')
//     res.end('hello node')
// })

app.listen(3065, () => {
    console.log('서버 실행 중')
})