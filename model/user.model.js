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
          args: ["^((?:\\w|[\\-_ ](?![\\-_ ])|[\\u00C0\\u00C1\\u00C2\\u00C3\\u00C4\\u00C5\\u00C6\\u00C7\\u00C8\\u00C9\\u00CA\\u00CB\\u00CC\\u00CD\\u00CE\\u00CF\\u00D0\\u00D1\\u00D2\\u00D3\\u00D4\\u00D5\\u00D6\\u00D8\\u00D9\\u00DA\\u00DB\\u00DC\\u00DD\\u00DF\\u00E0\\u00E1\\u00E2\\u00E3\\u00E4\\u00E5\\u00E6\\u00E7\\u00E8\\u00E9\\u00EA\\u00EB\\u00EC\\u00ED\\u00EE\\u00EF\\u00F0\\u00F1\\u00F2\\u00F3\\u00F4\\u00F5\\u00F6\\u00F9\\u00FA\\u00FB\\u00FC\\u00FD\\u00FF\\u0153])+)$", "i"],
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
          args: ["^((?:\\w|[\\-_ ](?![\\-_ ])|[\\u00C0\\u00C1\\u00C2\\u00C3\\u00C4\\u00C5\\u00C6\\u00C7\\u00C8\\u00C9\\u00CA\\u00CB\\u00CC\\u00CD\\u00CE\\u00CF\\u00D0\\u00D1\\u00D2\\u00D3\\u00D4\\u00D5\\u00D6\\u00D8\\u00D9\\u00DA\\u00DB\\u00DC\\u00DD\\u00DF\\u00E0\\u00E1\\u00E2\\u00E3\\u00E4\\u00E5\\u00E6\\u00E7\\u00E8\\u00E9\\u00EA\\u00EB\\u00EC\\u00ED\\u00EE\\u00EF\\u00F0\\u00F1\\u00F2\\u00F3\\u00F4\\u00F5\\u00F6\\u00F9\\u00FA\\u00FB\\u00FC\\u00FD\\u00FF\\u0153])+)$", "i"],
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

