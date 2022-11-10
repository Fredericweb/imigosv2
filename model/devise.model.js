module.exports = (sequelize,DataTypes) =>{
    const devise = sequelize.define('devise',{
        idDevise: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        libDevise: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    args: true,
                    msg:'Le champs libellé devise ne doit pas être vide'
                },
                is:{
                    args: ["^[a-zA-Z]+$",'i'],
                    msg : 'Le libellé de la devise doit être une chaîne de caractère'
                }
            }
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate:{
                notEmpty: {
                    args: true,
                    msg:'Le champs valeur devise ne doit pas être vide'
                },
                isFloat: {
                    args: true,
                    msg:'La valeur de la devise doit être un entier'
                }
            }
           
        }
    })
    return devise
}