const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const bcrypt = require('bcrypt')
const { User } = require('../models')

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({
                where: { email }
            })
            if (!user) {
                return done(null, false, { reason: '존재하지 않는 사용자입니다!' }) // 서버에러, 성공, 클라이언트에러
            }
            const result = await bctypt.compare(password, user.passport) //받은비번 디비비번 비교
            if (result) {
                return done(null, user) // 사용자정보넘겨줌
            }
            return done(null, false, { reason: '비밀번호가 틀렸습니다' })
        } catch (error) {
            console.error(error)
            return done(error)
        }
        
    }))
}