module.exports = function (sequelize, DataTypes) {
    let Boards = sequelize.define("Boards", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 40]
            }
        },
        starred: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
    return Boards
}