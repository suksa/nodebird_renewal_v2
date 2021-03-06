const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')

const { User } = require('../models')

const router = express.Router()

router.post('/login', (req, res, next => { // passport
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err)
            return next(err)
        }
        if (info) {
            return res.status(401).send(info.reason)
        }
        return req.login(user, async (loginErr) => {
            if (loginErr) {
                console.error(loginErr)
                return next(loginErr)
            }
            return res.json(user)
        })
    })(req, res, next)
}))

router.post('/', async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: {
                email: req.body.email // db에 email 중복검사
            }
        })
        if (exUser) {
            return res.status(403).send('이미 사용중인 아이디입니다')
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12) // 10 ~ 13
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        })
        //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3060')
        res.status(200).send('ok')
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router