module.exports = function (sequelize, DataTypes) {
    let Cards = sequelize.define("Cards", {
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        list_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        starred: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    return Cards
}