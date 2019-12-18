module.exports = (sequalize, DataTypes) => {
    const landlord = sequalize.define('landlord', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING
    },
    {
        freezeTableName: true,
    }
    )

    landlord.associate = (models) => {
        landlord.hasMany(models.property)
    }

    return landlord
}