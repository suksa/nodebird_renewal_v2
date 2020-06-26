module.exports = (sequelize, DataTypes) => {
    // 테이블생성 시퀄라이즈에선 모델
    const User = sequelize.define('User', { // MySQL에는 users 테이블 생성
        // id 기본적으로 들어있음
        email: {
            type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
            allowNull: false, // 필수여부  false = 필수
            unique: true, // 고유값
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', //한글저장
    })
    User.associate = (db) => {
        db.User.hasMany(db.Post) // 1대 다 관계
        db.User.hasMany(db.Comment)
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' })  // through 중간테이블 이름 정함
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' }) // foreignKey는 반대로(?)
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' }) // 컬럼 이름이 똑같아져서 foreignKey 사용
    }
    return User
}