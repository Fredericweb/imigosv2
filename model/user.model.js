module.exports = (sequelize, DataTypes)=>{

  const users = sequelize.define("users", {
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING,
    },
    prenom: {
      type: DataTypes.STRING,
    },
    email: {
     type: DataTypes.STRING
    },
    contact: {
     type: DataTypes.STRING
    },
    password:{
      type: DataTypes.STRING
    },
    profil:{
      type: DataTypes.STRING,
      defaultValue: 'photo.png'
    },
  })
  return users;
}

