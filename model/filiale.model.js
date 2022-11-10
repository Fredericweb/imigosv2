module.exports = (sequelize, DataTypes) => {
    const filiale = sequelize.define('filiale',{
        idFiliale: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        libFiliale: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    args: true,
                    msg:'Le champs libellé filiale ne doit pas être vide'
                },
            }
        },
        sigle:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg:'Le champs sigle ne doit pas être vide'
                },
                isUppercase: {
                    args: true,
                    msg: 'Le sigle doit être en caractère majuscule'
                }
            }
        },
        idDevise: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg:'Le champs Devise ne doit pas être vide'
                },
                isInt: {
                    args: true,
                    msg: 'idDevise doit entre un entier'
                }
            }
        },
        idLangue:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg:'Le champs langue ne doit pas être vide'
                },
                isInt: {
                    args: true,
                    msg: 'idlangue doit entre un entier'
                }
            }
        }
    })
    return filiale
}