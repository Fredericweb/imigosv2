module.exports = (sequelize, DataTypes) => {
    const genre = sequelize.define('genreFact', {
        idGenre: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        libGenre: {
            allowNull: false,
            type: DataTypes.STRING
        }
    })
    return genre
}