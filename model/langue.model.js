module.exports = (sequelize, DataTypes) => {
    const langue = sequelize.define('langue', {
        idLangue: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        libLangue: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Le champs langue ne doit pas être vide '
                },
                is: {
                    args: ["^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]+$",'i'],
                    msg: 'la langue doit être une chaîne de caractère'
                }
            }
        }
    })
    return langue
}