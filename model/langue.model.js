module.exports = (sequelize, DataTypes) => {
    const langue = sequelize.define('langue',{
        idLangue: {
            autoIncrement : true,
            primaryKey : true,
            type: DataTypes.INTEGER
        },
        libLangue: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return langue
}