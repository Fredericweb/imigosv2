const Db = require('../config/Db')

const taxe = Db.taxe

const all = async (req, res) => {
    try {
        const allTaxe = await taxe.findAll()
        res.status(201).send(allTaxe)
    } catch (err) {
        res.status(404).send({message: "Une erreur s'est produite"})
    }

}

const add = async (req, res) => {
    try {
        const verifTaxe = await taxe.findOne({ where: { libTaxe: req.body.libTaxe } })
        if (verifTaxe) {
            res.json({ message: 'La taxe existe déjà !!' })
            console.log({ message: 'La taxe existe déjà !!' })
        } 
        const addTaxe = await taxe.create({ ...req.body })
        res.status(200).send({message: 'Informations enregistrées'})
    } catch (err) {
        res.status(201).send({ message: err.errors[0].message })
        console.log({ message: err.errors[0].message },err)
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
            res.status(200).send({message: 'Modifications enregistées'})
        }catch(err){
            res.status(201).send({message: err.errors[0].message})
            console.log({message:err.errors[0].message},err)
        }
    }
}

module.exports = { all, add, update }