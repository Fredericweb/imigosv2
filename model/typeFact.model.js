module.exports = (sequelize, DataTypes) =>{
    const typeFact = sequelize.define('typefact', {
        idTypeFact :{
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        libTypeFact: {
            type:DataTypes.STRING
        }
    })
    return typeFact
}