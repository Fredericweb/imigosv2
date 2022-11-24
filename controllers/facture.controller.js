const Db = require('../config/Db')
const { Op } = require("sequelize");

const inv = Db.inventaire
const filiale = Db.filiale
const langue = Db.langue
const part = Db.part
const taxe = Db.taxe
const typeFact = Db.typeFact
const devise = Db.devise
const update = Db.updateFact

let idfiliale
let idTypeFact
let partIMI
let partGOS
let partFiliale
let filialeTaxe 
let rec
let date
let dateBrut

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

const message = [] // retour de la facture


const cp = ['IMI', 'OP CP']   //Verification du type de facture

const all = async (req, res) => {
    // recuperation de tous les nom et id de filiale 
    const allFiliale = await filiale.findAll({
        attribues: ['libFiliale', 'idFiliale']
    })
    
    // recuperation des differentes dates dans le table inventaire
    const dateInv = await inv.findAll({
        attributes: ['createdAt'],
        group: ['createdAt'],
    })

    try {
        for (const i of allFiliale) {

            for (const f of dateInv) {

                // recuperation de la periode
                dateBrut = f.createdAt.split('-')
                date = new Date()
                date.setMonth(dateBrut[1] - 1)
                date.setFullYear(dateBrut[0])
                periode = mois(date.getMonth() - 1) + ' ' + date.getFullYear()

                // somme des UNITPRICE en fonction de de la date, du pays,et du CP_REMARK
                for (const e of cp) {
                    const sumUniprice = await inv.sum('UNITPRICE', {
                        where: {
                            [Op.and]: [
                                { COUNTRY: i.libFiliale },
                                { createdAt: f.createdAt },
                                { CP_REMARKS: e }
                            ]
                        }
                    })
                    service = e == 'IMI' ? 'Service CMS' : 'Service MIGRES'
                    filialeBrut = i.libFiliale
                    idfiliale = i.idFiliale

                    // recuperation de l'id Typefact
                    const typeFactId = await typeFact.findAll({
                        attributes: ['idTypeFact'],
                        where: {
                            libTypeFact: service
                        }
                    })
                    idTypeFact = typeFactId[0].idTypeFact

                    // recuperation des elements de la table parts
                    const partElt = await part.findAll({
                        attribues: ['partIMI', 'partGOS', 'partFiliale'],
                        where: {
                            [Op.and]: [
                                { idTypeFact: idTypeFact },
                                { idFiliale: idfiliale },
                            ]
                        }
                    })
                    rec = partElt[0]
                    partIMI = rec.partIMI 
                    partGOS = rec.partGOS 
                    partFiliale = rec.partFiliale
                    
                    // recuperation des elements de la table taxe
                    const taxeF = await taxe.findAll({
                        attribues: ['libTaxe', 'value'],
                        where: {
                            idFiliale: idfiliale,
                        }
                    })
                    filialeTaxe = taxeF[0].value

                    if (sumUniprice != null) {
                        message.push({
                            filiale: filialeBrut, date: f.createdAt, taxeFiliale: filialeTaxe, facture:
                                [{ Type: service, UNITPRICE: sumUniprice, part_IMI: partIMI, part_GOS: partGOS, part_Filiale: partFiliale }]
                        })
                    }
                }

            }

        }

        res.status(200).send(message)
    } catch (err) {
        res.status(201).send(err)
        console.log(err)
    }
}

module.exports = { all }