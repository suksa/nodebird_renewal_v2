module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define('Hashtag', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4', // mb4 이모티콘까지저장
        collate: 'utf8mb4_general_ci',
    })
    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' }) // 다대다 관계에선 중간테이블이생김
    }
    return Hashtag
}