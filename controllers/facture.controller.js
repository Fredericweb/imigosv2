const Db = require('../config/Db')
const { Op } = require("sequelize");
// const { filiale, typeFact } = require('../config/Db');
const fact = Db.facture
const devise = Db.devise
const langue = Db.langue
const taxe = Db.taxe
const part = Db.part

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
    try{
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
        res.send({message: 'modification éffectuée'})
    }catch(err){
        res.send({message: "Une erreur s'est produite"})
    }
   
}
const infoFact = async (req, res) =>{
    try{
        const getFact = await fact.findAll({
           include: {all: true},
            where: {idFact: req.params.id}
        })
        // infos de la facture globale
        const idFiliale  = getFact[0].idFiliale
        const ref = getFact[0].ref
        const montant = getFact[0].montant
        const newMontant = getFact[0].newMontant
        const periode = getFact[0].periode
        const libFiliale = getFact[0].filiale.libFiliale
        const sigle = getFact[0].filiale.sigle
        const idTypeFact = getFact[0].idTypeFact
        const typeFact = getFact[0].typefact.libTypeFact
        const dateEmission = getFact[0].updateAt
        console.log(libFiliale)
        // infos devise 
        const idDevise = getFact[0].filiale.idDevise
        const deviseFiliale = await devise.findAll({
            attribues: ['libDevise', 'value'],
            where: {idDevise: idDevise}
        })
        const libDevise = deviseFiliale[0].libDevise
        const valueDevise = deviseFiliale[0].value

        // infos langue
        const idLangue = getFact[0].filiale.idLangue
        const langueFiliale  = await langue.findAll({
            attribues: ['libLangue'],
            where: {idLangue: idLangue}
        })
        const libLangue = langueFiliale[0].libLangue

        // infos taxes
        const taxeFiliale = await taxe.findAll({
            attributes: ['libTaxe', 'value'],
            where: {idFiliale: idFiliale}
        })
        const taxeValue = taxeFiliale[0].value

        // infos part 
        const partFiliale = await part.findAll({
            where: {
                [Op.and]: [
                    {idFiliale: idFiliale},
                    {idTypeFact: idTypeFact}
                ]
            }
        })
        const partImi = partFiliale[0].partIMI
        const partGos = partFiliale[0].partGOS
        const partFil = partFiliale[0].partFiliale

        // message de retour de facture 
        const montantValue = (newMontant!=null?newMontant:montant)
        const montantTTC = (montantValue*taxeValue)/100 + montantValue
        const calcHt = (part)=>{
            return (montantValue*part)/100
        }
        
        const msg = {
            identifiant : ref,
            filiale: libFiliale,
            typeFact: typeFact,
            dateEmission: dateEmission,
            periode: periode,
            devise: libDevise,
            euro: valueDevise,
            Rcollecter: [
                 {
                    lib: "Chiffre d'affaire global validé",
                    montant: montantValue,
                    taxe: taxeValue,
                    montantTTC: montantTTC,
                    euroTTC: montantTTC * valueDevise
                 },
                 {
                    lib:"Chiffre d'affaire des services IMI mobile" ,
                    taxe: taxeValue,
                 },
                 {
                    lib:"Chiffre d'affaire Orange Content " ,
                    taxe: taxeValue,
                 }
            ],
            RPartager: [
                {
                    lib: "Revenu share dû à IMI",
                    montant: montantValue,
                    part: partImi,
                    montantHT: calcHt(partImi),
                    euroTTC: calcHt(partImi) * valueDevise
                 },
                 {
                    lib: "Revenu share dû à GOS",
                    montant: montantValue,
                    part: partGos,
                    montantHT: calcHt(partGos),
                    euroTTC: calcHt(partGos) * valueDevise
                 },
                 {
                    lib: "Revenu share dû à I"+ libFiliale,
                    montant: montantValue,
                    part: partFil,
                    montantHT: calcHt(partFil),
                    euroTTC: calcHt(partFil) * valueDevise
                 },
            ]
        }

        res.send(msg)
    }catch(err){
        res.send({message: "une erreur s'est produite !!!"})
        console.log(err)
    }
}


module.exports = { byDate, update, updateEtat, infoFact }