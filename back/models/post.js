module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, {
        charset: 'utf8mb4', // mb4 이모티콘까지저장
        collate: 'utf8mb4_general_ci',
    })
    Post.associate = (db) => {
        db.Post.belongsTo(db.User) // belongsTo: 속헤있는
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }) // belongsToMany: 다대다관계
        db.Post.hasMany(db.Comment)
        db.Post.hasMany(db.Image)
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' })
        db.Post.belongsTo(db.Post, { as: 'Retweet' })
    }
    return Post
}