const Db = require('../config/Db')
const { Op } = require("sequelize");
const { facture } = require('../config/Db');

const inv = Db.inventaire
const filiale = Db.filiale
const typeFact = Db.typeFact

let idfiliale
let idTypeFact
let date
let dateCrea
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
        where: { etat: 0 }
    })

    try {
        if (dateInv[0]) {
            for (const i of allFiliale) {
                dateCrea = dateInv[0].createdAt
                dateBrut = dateCrea.split('-')
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
                                { createdAt: dateCrea },
                                { CP_REMARKS: e },
                                { etat: 0 }
                            ]
                        }
                    })
                    service = e == 'IMI' ? 'Service CMS' : 'Service MIGRES'
                    console.log(sumUniprice)
                    idfiliale = i.idFiliale
                    filialeBrut = i.libFiliale

                    // recuperation de l'id Typefact
                    const typeFactId = await typeFact.findAll({
                        attributes: ['idTypeFact'],
                        where: {
                            libTypeFact: service
                        }
                    })
                    idTypeFact = typeFactId[0].idTypeFact

                    ref = `GOS-${service}-${periode}-${idfiliale}/${filialeBrut}`

                    idEtat = 1
                    montant = Math.round(sumUniprice)
                    if(montant != 0){
                        const addFacture = await facture.create({
                            periode: periode,
                            idFiliale: idfiliale,
                            idTypeFact: idTypeFact,
                            montant: montant,
                            ref: ref,
                            idEtat: idEtat
                        })
                        message.push({ filiale: filialeBrut, periode: periode, typefact: idTypeFact, reference: ref, unitprice: sumUniprice, etat: idEtat })
                    }
                
                   
                }

            }
            const updateInv = await inv.update(
                {
                    etat: 1
                },
                {
                    where: { etat: 0 }
                }
            )
            res.status(201).send(message)
        } else {
            res.status(201).send({ message: 'Toutes les données ont été chargées' })
        }


    } catch (err) {
        res.status(201).send(err)
        console.log(err)
    }
}

module.exports = { all }