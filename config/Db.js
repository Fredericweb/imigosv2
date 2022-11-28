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

 /*------------------------------------------------------------------------------------
                                INTIALISATION DES MODELS
  -------------------------------------------------------------------------------------*/

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
Db.updateFact = require('../model/updateFact.model')(sequelize, DataTypes);
Db.etat = require('../model/etatFact.model')(sequelize, DataTypes);

Db.sequelize.sync({ force: false })
  .then(() => {
    console.log('ok')
  })

  /*------------------------------------------------------------------------------------
                                GESTION DES CLES ETRANGERES 
  -------------------------------------------------------------------------------------*/

//  connection clé etrangère entre filiale et devise
Db.role.hasMany(Db.users, {
  foreignKey: 'idRole',
})

Db.users.belongsTo(Db.role, {
  foreignKey: 'idRole',
})


//  connection clé etrangère entre filiale et langue
Db.langue.hasMany(Db.filiale, {
  foreignKey: 'idLangue',
})

Db.filiale.belongsTo(Db.langue, {
  foreignKey: 'idLangue',
})


//  connection clé etrangère entre filiale et devise
Db.devise.hasMany(Db.filiale, {
  foreignKey: 'idDevise',
})

Db.filiale.belongsTo(Db.devise, {
  foreignKey: 'idDevise',
})
//  connection clé etrangère entre part et filiale
Db.filiale.hasMany(Db.part, {
  foreignKey: 'idFiliale',
})

Db.part.belongsTo(Db.filiale, {
  foreignKey: 'idFiliale',
})

//  connection clé etrangère entre part et Typefact

Db.typeFact.hasMany(Db.part, {
  foreignKey: 'idTypeFact'
})

Db.part.belongsTo(Db.typeFact, {
  foreignKey: 'idTypeFact',
})

// connection clé etrangère entre Taxe et filiale

Db.filiale.hasMany(Db.taxe, {
  foreignKey: 'idFiliale',
})

Db.taxe.belongsTo(Db.filiale, {
  foreignKey: 'idFiliale',
})

// connection clé etrangère Filiale et facture
Db.filiale.hasMany(Db.facture, {
  foreignKey: 'idFiliale',
})
Db.facture.belongsTo(Db.filiale,{
  foreignKey: 'idFiliale',
})

// connection clé etrangère typeFacture et facture
Db.typeFact.hasMany(Db.facture, {
  foreignKey: 'idTypeFact',
})
Db.facture.belongsTo(Db.typeFact,{
  foreignKey: 'idTypeFact',
})

// connection clé etrangère updateFact et facture
Db.facture.hasMany(Db.updateFact, {
  foreignKey: 'idFact',
})
Db.updateFact.belongsTo(Db.facture, {
  foreignKey: 'idFact',
})
// connection clé etrangère facture et user
Db.users.hasMany(Db.facture,{
  foreignKey: 'id'
})

// connection clé etrangère updateFact et user
Db.users.hasMany(Db.updateFact,{
  foreignKey: 'id',
})
Db.updateFact.belongsTo(Db.users, {
  foreignKey : 'id',
})

// connection clé etrangère etat facture
Db.etat.hasMany(Db.facture, {
  foreignKey: 'idEtat',
})
Db.facture.belongsTo(Db.etat,{
  foreignKey: 'idEtat',
})




module.exports = Db