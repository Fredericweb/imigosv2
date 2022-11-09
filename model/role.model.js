module.exports = (sequelize, DataTypes) =>{
    const role = sequelize.define('role',{
        idRole: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        libRole: {
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
    return role
}