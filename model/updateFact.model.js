module.exports = (sequelize, DataTypes) => {
    const updateFact = sequelize.define('updateFact', {
        idUpdateFact: {
            primaryKey : true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        idFact: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        MtGlobal : {
            type: DataTypes.INTEGER,
            allowNull: false, 
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return  updateFact
}