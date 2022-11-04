module.exports = (sequelize, DataTypes) => {
    const filiale = sequelize.define('filiale',{
        idFiliale: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        libFiliale: {
            type: DataTypes.STRING
        },
        sigle:{
            type: DataTypes.STRING
        },
        idDevise: {
            type: DataTypes.INTEGER
        }
    })
    return filiale
}