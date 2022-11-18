const Db = require('../config/Db')

const etat = Db.etat

const all = async (req,res) =>{
    const allEtat = await etat.findAll()
    res.json(allEtat)
}

module.exports = {all}