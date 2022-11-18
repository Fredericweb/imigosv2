module.exports = (sequelize, DataTypes) => {
    const etatFact = sequelize.define('etatFact', {
        idEtat: {
            autoIncrement: true, 
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        libEtat: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return etatFact
}