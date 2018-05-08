module.exports = function (sequelize, DataTypes) {
    let Lists = sequelize.define("Lists", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        board_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        starred: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    return Lists
}

