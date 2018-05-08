module.exports = function (sequelize, DataTypes) {
    let Boards = sequelize.define("Boards", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        starred: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
    return Boards
}