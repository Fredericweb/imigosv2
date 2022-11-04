module.exports = (sequelize,  DataTypes) =>{
    const taxe = sequelize.define('taxe', {
        idTaxe: {
            autoIncrement : true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        libTaxe: {
            type: DataTypes.STRING
        },
        value: {
            type: DataTypes.FLOAT
        }
    })
    return taxe
}