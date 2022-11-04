module.exports = (sequelize, DataTypes) =>{
    const role = sequelize.define('role',{
        idRole: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        libRole: {
            type: DataTypes.STRING,
        }
    })
    return role
}