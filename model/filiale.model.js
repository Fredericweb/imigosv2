module.exports = (sequelize, DataTypes) => {
    const filiale = sequelize.define('filiale',{
        idFiliale: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        libFiliale: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sigle:{
            type: DataTypes.STRING,
            allowNull: false
        },
        idDevise: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idLangue:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return filiale
}