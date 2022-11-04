module.exports = (sequelize, DataTypes) => {
    const part = sequelize.define('part', {
        idPart: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        libPart: {
            type: DataTypes.STRING
        },
        partIMI: {
            type: DataTypes.FLOAT
        },
        partGOS: {
            type: DataTypes.FLOAT
        },
        partFiliale: {
            type: DataTypes.FLOAT
        }

    })
    return part
}