const Db = require('../config/Db')
const { Op } = require("sequelize");

const inv = Db.inventaire
const filiale = Db.filiale



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
                    service = e == 'IMI'?'Service CMS':'Service MIGRES'
                    filialeBrut = "ORANGE "+i

                    if (sumUniprice != null) {
                        message.push({ filiale: filialeBrut, UNITPRICE: [{ value: sumUniprice, Type: service, date: f.DATE,  }] })
                    }
                }

            }

            // const allInv = await inv.findAll({
            //     attribues: ['DATE', 'COUNTRY', 'UNIPRICE', 'CP_REMARKS'],
            //     where: {
            //         COUNTRY: i
            //     }
            // })

            // compte le nombre d'element par pays
            // let count = 0
            // for (const elt of allInv) {
            //     count += 1
            // }

        }




        res.status(200).send(message)
    } catch (err) {
        res.status(201).send(err)
        console.log(err)
    }


}

module.exports = { all }