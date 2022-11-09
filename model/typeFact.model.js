module.exports = (sequelize, DataTypes) => {
    const typeFact = sequelize.define('typefact', {
        idTypeFact: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        libTypeFact: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Le champs libellé type facture ne doit pas être vide'
                },
                is: {
                    args: [/^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._-\s]{5,60}$/],
                    msg: 'Le libellé type facture doit être un chaîne de caractère'
                }
            }
        }
    })
    return typeFact
}