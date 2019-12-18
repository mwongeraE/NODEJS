module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define('property', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, 
    {
        freezeTableName: true,
        timestamps: true,
    });

    Property.associate = (models) => {
        Property.belongTo(models.landlord)
    }

    return Property
}