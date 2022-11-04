const Db = require('../config/Db')

const taxe = Db.taxe

const all = async (req, res) => {
    try {
        const allTaxe = await taxe.findAll()
        res.status(201).send(allTaxe)
    } catch (err) {
        res.status(404).send('erreur')
    }

}

const add = async (req, res) => {
    try {
        const addTaxe = await taxe.create({ ...req.body })
        res.status(200).send(addTaxe)
    } catch (err) {
        res.status(201).send({ message: 'erreur' })
        console.log(err)
    }
}
const update = async (req, res) => {
    const info = await taxe.findByPk(req.params.id)
    if (info === null) {
        res.status(200).send("ID incorrect")
    } else {
        try{
            const taxeUpdate = await taxe.update(
                {
                    libTaxe: req.body.libTaxe,
                    value: req.body.value,
                    idFiliale: req.body.idFiliale
                },
                {
                    where: {idTaxe: req.params.id}
                }
            )
            res.status(200).send({message: 'modification enregistée'})
        }catch(err){
            res.status(201).send({message: "erreur"})
            console.log(err)
        }
    }
}

module.exports = { all, add, update }