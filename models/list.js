module.exports = function (sequelize, DataTypes) {
    let Lists = sequelize.define("Lists", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 40]
            }
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

