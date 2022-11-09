module.exports = (sequelize, DataTypes) => {
    const taxe = sequelize.define('taxe', {
        idTaxe: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        libTaxe: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Le champs libellé taxe ne doit pas être vide'
                }
            }
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'La champs valeur de la taxe ne doit pas être vide'
                },
                isFloat: {
                    args: true,
                    msg: 'La valeur de la taxe doit être un nombre'
                }
            }
        },
        idFiliale: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                args: true,
                msg:'Le champs filiale ne doit pas être vide'
            },
            isInt:{
                args: true,
                msg: 'Idfiliale doit être un entier'
            }
        }
    })
    return taxe
}