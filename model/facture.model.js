module.exports = (sequelize, DataTypes) => {
    const facture = sequelize.define('facture', {
        idFact: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        periode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idFiliale: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        idTypeFact: {
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        ref: {
            type: DataTypes.STRING,
            allowNull: false
        },
        montant:{
            type: DataTypes.INTEGER,
        },
        montantIMI:{
            type: DataTypes.INTEGER,
        },
        newMontant: {
            type: DataTypes.INTEGER,
        },
        id: {
            type: DataTypes.INTEGER
        },
        idEtat: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    })
    return facture
}