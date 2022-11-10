module.exports = (sequelize, DataTypes) => {

  const users = sequelize.define("users", {
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Le champs login ne doit pas être vide'
        },
      }
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Le champs nom ne doit pas être vide'
        },
        is: {
          args: [/^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._-\s]{5,60}$/],
          msg: 'Le nom doit être une chaîne de caractère'
        }
      }
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Le champs prenom ne doit pas être vide'
        },
        is: {
          args: [/^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._-\s]{5,60}$/],
          msg: 'Le prenom doit être une chaîne de caractère'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Le champs email ne doit pas être vide'
        },
        isEmail: {
          args: true,
          msg: 'Ce champs doit contenir un Email (exemple: cmsimi@gos.ci)'
        }
      }
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
       
        isNumeric: {
          args: true,
          msg: 'Le contact doit être une serie de chiffre'
        },
        len: {
          args: [5,15],
          msg: 'Le conctat doit contenir 5 à 15 chiffres'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Le champs mot de passe ne doit pas être vide'
        },
        len:{
          args:[5,1080],
          msg: 'le mot de passe doit être composé de minimum 5 caractères'
        }
      }
    },
    profil: {
      type: DataTypes.STRING,
      defaultValue: 'photo.png'
    },
    idRole: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg:'idRole doit être en format INTEGER'
        },
        notEmpty: {
          args: true,
          msg: 'IdRole ne doit pas être vide'
        },
      }
    }
  })
  return users;
}

