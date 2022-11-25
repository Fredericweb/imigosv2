const Db = require('../config/Db')
const { Op } = require("sequelize");
const fact = Db.facture

// fonction de mois en toutes lettres
const mois = (mois) => {
    switch (mois) {
        case 0: return 'Janvier'
            break
        case 1: return 'Fevrier'
            break
        case 2: return 'Mars'
            break
        case 3: return 'Avril'
            break
        case 4: return 'Mai'
            break
        case 5: return 'juin'
            break
        case 6: return 'Juillet'
            break
        case 7: return 'Aout'
            break
        case 8: return 'Septembre'
            break
        case 9: return 'Octobre'
            break
        case 10: return 'Novembre'
            break
        case 11: return 'Décembre'
            break

    }
}
const date = new Date()
periode = mois(date.getMonth() - 1) + ' ' + date.getFullYear()

const byDate = async (req, res) => {

    try {
        const allFact = await fact.findAll({ where: { periode: periode } })
        res.send(allFact)
    } catch (err) {
        res.send(err)
    }

}
const update = async (req, res) => {
    try {
        const updateFact = await fact.update(
            {
                newMontant: req.body.newMontant,
                id: req.body.id,
                idEtat: 4
            },
            {
                where: {idFact:req.params.idFact }
            }
        )
        res.send(updateFact)
    } catch (err) {
        res.send(err)
    }
}
const updateEtat = async (req, res)=>{
    const Etat = await fact.update(
        {
            idEtat : req.body.idEtat
        },
        {
            where: {
                idFact : req.params.id
            }
        }
    ) 
}



module.exports = { byDate, update, updateEtat }