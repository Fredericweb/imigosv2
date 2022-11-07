module.exports = (sequelize,  DataTypes) =>{
    const taxe = sequelize.define('taxe', {
        idTaxe: {
            autoIncrement : true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        libTaxe: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        idFiliale:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    })
    return taxe
}