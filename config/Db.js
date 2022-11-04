const { Sequelize, DataTypes } = require('sequelize');
const crypt = require('sequelize-bcrypt')
const dbParam = require('./DbConfig')

const sequelize = new Sequelize(
  dbParam.DB_NAME,
  dbParam.USERNAME,
  dbParam.PASSWORD,
  {
    host: dbParam.HOST,
    dialect: dbParam.DIALECT
  }
);

try {
  sequelize.authenticate();
  console.log(`Connecté à ${dbParam.DB_NAME}`);
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
const Db = {}

Db.Sequelize = Sequelize;
Db.sequelize = sequelize;

Db.users = require('../model/user.model')(sequelize, DataTypes);
Db.filiale = require('../model/filiale.model')(sequelize, DataTypes);
Db.langue = require('../model/langue.model')(sequelize, DataTypes);
Db.devise = require('../model/devise.model')(sequelize, DataTypes);
Db.role = require('../model/role.model')(sequelize, DataTypes);
Db.typeFact = require('../model/typeFact.model')(sequelize, DataTypes);
Db.part = require('../model/part.model')(sequelize, DataTypes);
Db.taxe = require('../model/taxe.model')(sequelize, DataTypes);
Db.inventaire = require('../model/inventaire.model')(sequelize, DataTypes);
Db.facture = require('../model/facture.model')(sequelize, DataTypes);

Db.sequelize.sync({ force: false })
  .then(() => {
    console.log('ok')
  })


//  connection clé etrangère entre filiale et devise
Db.role.hasMany(Db.users, {
  foreignKey: 'idRole',
  as: 'users'
})

Db.users.belongsTo(Db.role, {
  foreignKey: 'idRole',
  as: 'role'
})


//  connection clé etrangère entre filiale et langue
Db.langue.hasMany(Db.filiale, {
  foreignKey: 'idLangue',
  as: 'fililale'
})

Db.filiale.belongsTo(Db.langue, {
  foreignKey: 'idLangue',
  as: 'langue'
})


//  connection clé etrangère entre filiale et devise
Db.devise.hasMany(Db.filiale, {
  foreignKey: 'idDevise',
  as: 'filiale'
})

Db.filiale.belongsTo(Db.devise, {
  foreignKey: 'idDevise',
  as: 'devise'
})
//  connection clé etrangère entre part et filiale
Db.filiale.hasMany(Db.part, {
  foreignKey: 'idFiliale',
  as: 'filiale'
})

Db.part.belongsTo(Db.filiale, {
  foreignKey: 'idFiliale',
  as: 'part1'
})

//  connection clé etrangère entre part et Typefact

Db.typeFact.hasMany(Db.part, {
  foreignKey: 'idTypeFact',
  as: 'typefact'
})

Db.part.belongsTo(Db.typeFact, {
  foreignKey: 'idTypeFact',
  as: 'part'
})

// connection clé etrangère entre Taxe et filiale

Db.filiale.hasMany(Db.taxe, {
  foreignKey: 'idFiliale',
  as: 'filiale2'
})

Db.taxe.belongsTo(Db.filiale, {
  foreignKey: 'idFiliale',
  as: 'taxe'
})

// connection clé etrangère Filiale et facture
Db.filiale.hasMany(Db.facture, {
  foreignKey: 'idFiliale',
  as:'filiale3'
})
Db.facture.belongsTo(Db.filiale,{
  foreignKey: 'idFiliale',
  as:'facture'
})

// connection clé etrangère typeFacture et facture
Db.typeFact.hasMany(Db.facture, {
  foreignKey: 'idTypeFact',
  as: 'typeFact2'
})
Db.facture.belongsTo(Db.typeFact,{
  foreignKey: 'idTypeFact',
  as: 'facture2'
})

module.exports = Db