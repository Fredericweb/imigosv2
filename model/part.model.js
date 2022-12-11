module.exports = (sequelize, DataTypes) => {
    const part = sequelize.define('part', {
        idPart: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        libPart: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Le champs libellé part ne doit pas être vide'
                },
            }
        },
        partIMI: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Le champs pourcentage IMI ne doit pas être vide'
                },
                isFloat: {
                    args: true,
                    msg: 'pourcentage IMI doit être un nombre'
                }
            }
        },
        partOther: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Le champs pourcentage IMI ne doit pas être vide'
                },
                isFloat: {
                    args: true,
                    msg: 'pourcentage IMI doit être un nombre'
                }
            }
        },
        partGOS: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Le champs pourcentage GOS ne doit pas être vide'
                },
                isFloat: {
                    args: true,
                    msg: 'pourcentage GOS doit être un nombre'
                }
            }
        },
        partFiliale: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Le champs pourcentage filiale ne doit pas être vide'
                },
                isFloat: {
                    args: true,
                    msg: 'pourcentage filiale doit être un nombre'
                }
            }
        },
        idFiliale: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Le champs filiale ne doit pas être vide'
                },
                isInt: {
                    args: true,
                    msg: 'idFiliale doit être un entier'
                }
            }
        },
        idTypeFact: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Le champs type facture ne doit pas être vide'
                },
                isInt: {
                    args: true,
                    msg: 'idTypeFact  doit être un entier'
                }
            }
        }
    })
    return part
}