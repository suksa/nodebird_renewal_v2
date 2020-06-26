module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // UserId: 1   -- belongsTo 쓰면 컬럼이 생김 (belongsTo 쓰는곳에 생김)
        // PostId: 3
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    })
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User)
        db.Comment.belongsTo(db.Post)
    }
    return Comment
}