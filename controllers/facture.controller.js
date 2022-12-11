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

const byEtat = async (req, res) => {
    try {
        const getByEtat = await fact.findAll({
            include: { all: true },
            where: { idEtat: req.body.idEtat }
        })
        res.status(200).send(getByEtat)
    } catch (err) {
        res.status(404).send({ message: "une erreur s'est produite", err: err })
        console.log(err)
    }

}
const byDate = async (req, res) => {

    try {
        const allFact = await fact.findAll({ where: { periode: periode } })
        res.status(200).send(allFact)
    } catch (err) {
        res.status(404).send(err)
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
                where: { idFact: req.params.idFact }
            }
        )
        res.status(200).send(updateFact)
    } catch (err) {
        res.status(404).send(err)
    }
}
const updateEtat = async (req, res) => {
    try {
        const Etat = await fact.update(
            {
                idEtat: req.body.idEtat
            },
            {
                where: {
                    idFact: req.params.id
                }
            }
        )
        res.status(200).send({ message: 'modification éffectuée' })
    } catch (err) {
        res.status(404).send({ message: "Une erreur s'est produite" })
    }

}
const infoFact = async (req, res) => {
    try {
        const getFact = await fact.findAll({
            include: { all: true },
            where: { idFact: req.params.id }
        })
        // infos de la facture globale
        const idFiliale = getFact[0].idFiliale
        const ref = getFact[0].ref
        const montant = getFact[0].montant
        const montantIMI = getFact[0].montantIMI
        const newMontant = getFact[0].newMontant
        const periode = getFact[0].periode
        const libFiliale = getFact[0].filiale.libFiliale
        const genre = getFact[0].filiale.idGenre
        const sigle = getFact[0].filiale.sigle
        const idTypeFact = getFact[0].idTypeFact
        const typeFact = getFact[0].typefact.libTypeFact
        const dateEmission = getFact[0].updateAt
        console.log(genre)
        // infos devise 
        const idDevise = getFact[0].filiale.idDevise
        const deviseFiliale = await devise.findAll({
            attribues: ['libDevise', 'value'],
            where: { idDevise: idDevise }
        })
        const libDevise = deviseFiliale[0].libDevise
        const valueDevise = deviseFiliale[0].value

        // infos langue
        const idLangue = getFact[0].filiale.idLangue
        const langueFiliale = await langue.findAll({
            attribues: ['libLangue'],
            where: { idLangue: idLangue }
        })
        const libLangue = langueFiliale[0].libLangue

        // infos taxes
        const taxeFiliale = await taxe.findAll({
            attributes: ['libTaxe', 'value'],
            where: { idFiliale: idFiliale }
        })
        const taxeValue = taxeFiliale[0].value

        // infos part 
        const partFiliale = await part.findAll({
            where: {
                [Op.and]: [
                    { idFiliale: idFiliale },
                    { idTypeFact: idTypeFact }
                ]
            }
        })
        const partImi = partFiliale[0].partIMI
        const partGos = partFiliale[0].partGOS
        const partFil = partFiliale[0].partFiliale
        const partOther = partFiliale[0].partOther

        // message de retour de facture 
        const montantTTC = (newMontant != null ? newMontant : montant)
        const montantHT = montantTTC / (1 + (taxeValue / 100))
        const HTmontant = (montant) => {
            return Math.round(montant / (1 + (taxeValue / 100)))
        }
        const calcHt = (part, montant) => {
            return Math.round((montant * part) / 100)
        }
        const montantOC = montantTTC - montantIMI
        let msg = 0
        if(genre == 2) {
            msg = {  
                factureCMS:{
                    identifiant: ref,
                    filiale: libFiliale,
                    typeFact: "Service CMS",
                    dateEmission: dateEmission,
                    periode: periode,
                    devise: libDevise,
                    euro: valueDevise,
                    Rcollecter: [
                        {
                            lib: "Chiffre d'affaire global validé",
                            montantTTC: montantTTC,
                            taxe: taxeValue,
                            montantHT: Math.round(montantHT),
                            euroTTC: Math.round(montantTTC * valueDevise)
                        },
                        {
                            lib: "Chiffre d'affaire des services IMI mobile",
                            montantTTC: montantIMI,
                            montantHT: HTmontant(montantIMI),
                            taxe: taxeValue,
                            euroTTC: Math.round(montantIMI * valueDevise)
                        },
                        {
                            lib: "Chiffre d'affaire Orange Content ",
                            montantTTC: montantOC,
                            taxe: taxeValue,
                            montantHT: HTmontant(montantOC),
                            euroTTC: Math.round(montantOC * valueDevise)
                        }
                    ],
                    RPartager: [
                        {
                            lib: "Revenu share dû à IMI mobile",
                            CAPartager: HTmontant(montantIMI),
                            part: partImi,
                            montantHT: calcHt(partImi, HTmontant(montantIMI)),
                            euroTTC: calcHt(partImi, HTmontant(montantIMI)) * valueDevise
                        },
                        {
                            lib: "Revenu share dû à GOS",
                            CAPartagerHT: Math.round(HTmontant(montantIMI)),
                            part: partGos,
                            montantHT: calcHt(partGos, HTmontant(montantIMI)),
                            euroHT: Math.round(calcHt(partGos, HTmontant(montantIMI)) * valueDevise)
                        },
                        {
                            lib: "Mt total à reverser au GOS",
                            CAPartagerHT: '',
                            part: partGos,
                            montantHT: calcHt(partImi, HTmontant(montantIMI)) + Math.round(calcHt(partGos, HTmontant(montantIMI))),
                            euroHT: Math.round((calcHt(partGos, HTmontant(montantIMI)) * valueDevise )+ (calcHt(partImi, HTmontant(montantIMI)) * valueDevise)) 
                        },
                        {
                            lib: "Revenu share dû à " + libFiliale,
                            CAPartager: Math.round(montantIMI),
                            part: partFil,
                            montantHT: calcHt(partFil, HTmontant(montantIMI)) ,
                            euroHT: calcHt(partFil, HTmontant(montantIMI)) * valueDevise
                        },
                    ]
                },

                factureMIGRES:{
                    identifiant: ref,
                    filiale: libFiliale,
                    typeFact: "Service MIGRES",
                    dateEmission: dateEmission,
                    periode: periode,
                    devise: libDevise,
                    euro: valueDevise,
                    Rcollecter: [
                        {
                            lib: "Chiffre d'affaire global validé",
                            montantTTC: montantTTC,
                            taxe: taxeValue,
                            montantHT: Math.round(montantHT),
                            euroTTC: Math.round(montantTTC * valueDevise)
                        },
                        {
                            lib: "Chiffre d'affaire des services IMI mobile",
                            montantTTC: montantIMI,
                            montantHT: HTmontant(montantIMI),
                            taxe: taxeValue,
                            euroTTC: Math.round(montantIMI * valueDevise)
                        },
                        {
                            lib: "Chiffre d'affaire Orange Content ",
                            montantTTC: montantOC,
                            taxe: taxeValue,
                            montantHT: HTmontant(montantOC),
                            euroTTC: Math.round(montantOC * valueDevise)
                        }
                    ],
                    RPartager: [
                        {
                            lib: "Revenu share dû à IMI mobile",
                            montant: montantOC,
                            part: partImi,
                            montantHT: calcHt(partImi, HTmontant(montantOC)),
                            euroHT: calcHt(partImi, HTmontant(montantOC)) * valueDevise
                        },
                        {
                            lib: "Revenu share dû à GOS",
                            montant: Math.round(montantOC),
                            part: partGos,
                            montantHT: Math.round(HTmontant(montantOC)),
                            euroHT: Math.round(calcHt(partGos, montantOC) * valueDevise)
                        },
                        {
                            lib: "Mt total à reverser au GOS",
                            montant: '',
                            part: partGos,
                            montantHT: calcHt(partImi, HTmontant(montantOC)) + Math.round(calcHt(partGos, montantOC)),
                            euroHT: Math.round((calcHt(partGos, montantOC) * valueDevise )+ (calcHt(partImi, HTmontant(montantOC)) * valueDevise)) 
                        },
                        {
                            lib: "Revenu share dû à " + libFiliale,
                            montant: Math.round(montantOC),
                            part: partFil,
                            montantHT: calcHt(partFil, HTmontant(montantOC)) ,
                            euroHT: calcHt(partFil, HTmontant(montantOC)) * valueDevise
                        },
                    ]
                }
             
            }
        }else{
            msg = {
                identifiant: ref,
                filiale: libFiliale,
                typeFact: typeFact,
                dateEmission: dateEmission,
                periode: periode,
                devise: libDevise,
                euro: valueDevise,
                Rcollecter: [
                    {
                        lib: "Chiffre d'affaire global validé",
                        montantTTC: montantTTC,
                        taxe: taxeValue,
                        montantHT: Math.round(montantHT),
                        euroTTC: Math.round(montantTTC * valueDevise)
                    },
                    {
                        lib: "Chiffre d'affaire des services IMI mobile",
                        montantTTC: montantIMI,
                        montantHT: HTmontant(montantIMI),
                        taxe: taxeValue,
                        euroTTC: Math.round(montantIMI * valueDevise)
                    },
                    {
                        lib: "Chiffre d'affaire Orange Content ",
                        montantTTC: montantOC,
                        taxe: taxeValue,
                        montantHT: HTmontant(montantOC),
                        euroTTC: Math.round(montantOC * valueDevise)
                    }
                ],
                RPartager: [
                    {
                        lib: "Revenu share dû à IMI mobile",
                        montant: montantIMI,
                        part: partImi,
                        montantHT: calcHt(partImi, HTmontant(montantIMI)),
                        euroTTC: calcHt(partImi, HTmontant(montantIMI)) * valueDevise
                    },
                    {
                        lib: "Revenu share dû à IMI autres servies",
                        montant: montantOC,
                        part: partOther,
                        montantHT: calcHt(partOther, HTmontant(montantOC)),
                        euroHT: calcHt(partOther, HTmontant(montantOC)) * valueDevise
                    },
                    {
                        lib: "Revenu share dû à GOS",
                        montant: Math.round(montantHT),
                        part: partGos,
                        montantHT: Math.round(calcHt(partGos, montantHT)),
                        euroHT: Math.round(calcHt(partGos, montantHT) * valueDevise)
                    },
                    {
                        lib: "Revenu share dû à " + libFiliale,
                        montant: Math.round(montantHT),
                        part: partFil,
                        montantHT: calcHt(partFil, HTmontant(montantHT)),
                        euroHT: calcHt(partFil, HTmontant(montantHT)) * valueDevise
                    },
                ]
            }
        }


        res.status(200).send(msg)
    } catch (err) {
        res.status(404).send({ message: "une erreur s'est produite !!!" })
        console.log(err)
    }
}


module.exports = { byDate, update, updateEtat, infoFact, byEtat }