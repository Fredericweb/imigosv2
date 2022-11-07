module.exports = (sequelize,DataTypes) =>{
    const devise = sequelize.define('devise',{
        idDevise: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        libDevise: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    })
    return devise
}