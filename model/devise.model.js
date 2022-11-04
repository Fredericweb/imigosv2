module.exports = (sequelize,DataTypes) =>{
    const devise = sequelize.define('devise',{
        idDevise: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        libDevise: {
            type: DataTypes.STRING
        },
        value: {
            type: DataTypes.FLOAT
        }
    })
    return devise
}