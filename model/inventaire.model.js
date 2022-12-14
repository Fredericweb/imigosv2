module.exports = (sequelize, DataTypes) =>{
   const inventaire =  sequelize.define('inventaire', {
        
        DATE:{
            type: DataTypes.STRING
        },
        createdAt:{
            type: DataTypes.DATEONLY
        },
        OPERATOR:{
            type: DataTypes.STRING
        },
        COUNTRY:{
            type: DataTypes.STRING
        },
        MOBILENO:{
            type: DataTypes.STRING
        },
        PACKNAME:{
            type: DataTypes.STRING
        },
        NEW_KEYWORD:{
            type: DataTypes.STRING
        },
        DESCRIPTION:{
            type: DataTypes.STRING
        },
        EVENTTYPE:{
            type: DataTypes.STRING
        },
        CONTENTTYPE:{
            type: DataTypes.STRING
        },
        CLASSIFICATION:{
            type: DataTypes.STRING
        },
        UNITPRICE:{
            type: DataTypes.FLOAT
        },
        CPNAME:{
            type: DataTypes.STRING
        },
        DOWNLOADS:{
            type: DataTypes.INTEGER
        },
        REVENUE:{
            type: DataTypes.FLOAT
        },
        CP_REMARKS:{
            type: DataTypes.STRING
        },
        PRODUCT:{
            type: DataTypes.STRING
        }, 
        etat:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        }

    },{timestamps: false,})
    return inventaire
}