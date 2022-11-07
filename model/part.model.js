module.exports = (sequelize, DataTypes) => {
    const part = sequelize.define('part', {
        idPart: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        libPart: {
            type: DataTypes.STRING,
            allowNull: false
        },
        partIMI: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        partGOS: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        partFiliale: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        idFiliale: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        idTypeFact: {
            type:DataTypes.INTEGER,
            allowNull:false
        }
    })
    return part
}