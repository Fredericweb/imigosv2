module.exports = (sequelize, DataTypes)=>{

  const users = sequelize.define("users", {
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
     type: DataTypes.STRING,
     allowNull: false
    },
    contact: {
     type: DataTypes.STRING,
     allowNull: false
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    profil:{
      type: DataTypes.STRING,
      defaultValue: 'photo.png'
    },
    idRole:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
  return users;
}

