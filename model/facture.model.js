module.exports = (sequelize, DataTypes) => {
    const facture = sequelize.define('facture', {
        idFact: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        periode: {
            type: DataTypes.STRING
        }
    })
    return facture
}