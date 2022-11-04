const Db = require('../config/Db')

const filiale = Db.filiale

const add = async (req, res) => {
    try {
        const addFiliale = await filiale.create({ ...req.body })
        res.status(200).send(addFiliale)
    } catch (err) {
        res.status(404).send('erreur')
        console.log(err)
    }

}
const all = async (req, res) => {
    try {
        const allFiliale = await filiale.findAll({
            attributes: ['idFiliale', 'libFiliale', 'sigle', 'idLangue', 'idDevise']
        })
        console.log(allFiliale)
        res.status(200).send(allFiliale)
    } catch (err) {
        res.status(200).send('err')
        console.log(err)

    }

}

const update = async (req, res) => {
    const { libFiliale, sigle, idDevise, idLangue } = req.body
    const info = await filiale.findByPk(req.params.id)
    if (info === null) {
        res.status(200).send("utilisateur introuvable")
    } else {
        try {
            const filialeUpdate = await filiale.update(
                {
                    libFiliale: libFiliale,
                    sigle: sigle,
                    idDevise: idDevise,
                    idLangue: idLangue,
                },
                {
                    where: { idFiliale: req.params.id }
                }
            )
            console.log(req.params.id)
            res.status(200).send({ message: 'modification effectuée' })
            console.log(filialeUpdate)
        } catch (err) {
            res.status(201).send({ message: "une erreur s'est produite lors de la modification" })
            console.log(err)
        }
    }

}
module.exports = { add, all, update }