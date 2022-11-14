const Db = require('../config/Db')
const { Op } = require("sequelize");

const inv = Db.inventaire
const filiale = Db.filiale
const langue = Db.langue
const part = Db.part
const taxe = Db.taxe
const typeFact = Db.typeFact
const devise = Db.devise


const all = async (req, res) => {
    // recuperation de tous les nom de filiale dans une list
    const allFiliale = await filiale.findAll({
        attribues: ['libFiliale']
    })
    let list = []

    // recuperation du nom de filiale sans le "ORANGE" au debut
    for (const elt of allFiliale) {
        filialeBrutName = elt.libFiliale.split(" ")
        filialeBrutName.shift()
        filialeName = filialeBrutName.join(" ")
        list.push(filialeName)
    }
    try {
        const message = []

        for (const i of list) {
            // recuperation des differentes dates dans le table inventaire
            const dateInv = await inv.findAll({
                attributes: ['DATE'],
                group: ['DATE'],
            })

            // somme des UNITPRICE en fonction de de la date, du pays, et du CP_REMARK
            const cp = ['IMI', 'OP CP']
            for (const f of dateInv) {
                for (const e of cp) {
                    const sumUniprice = await inv.sum('UNITPRICE', {
                        where: {
                            [Op.and]: [
                                { COUNTRY: i },
                                { DATE: f.DATE },
                                { CP_REMARKS: e }
                            ]
                        }
                    })
                    service = e == 'IMI' ? 'Service CMS' : 'Service MIGRES'
                    filialeBrut = "ORANGE " + i

                    // recuperation de l'id de la filiale
                    const filialeId = await filiale.findAll({
                        attributes: ['idFiliale'],
                        where: {
                            libFiliale: filialeBrut
                        }
                    })
                    let idfiliale = 0
                    for (const idf of filialeId) {
                        idfiliale = idf.idFiliale
                    }

                    // recuperation de l'id Typefact
                    const typeFactId = await typeFact.findAll({
                        attributes: ['idTypeFact'],
                        where: {
                            libTypeFact: service
                        }
                    })
                    let idTypeFact = 0
                    for (const idt of typeFactId) {
                        idTypeFact = idt.idTypeFact
                    }

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
                    let partIMI=0
                    let partGOS=0
                    let partFiliale=0
                    for (const elts of partElt) {
                        partIMI = elts.partIMI
                        partGOS = elts.partGOS
                        partFiliale = elts.partFiliale
                    }



                    if (sumUniprice != null) {
                        message.push({
                            filiale: filialeBrut, date: f.DATE, facture:
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