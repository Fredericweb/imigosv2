const Db = require('../config/Db')

const langue = Db.langue

const add = async (req, res) => {
    try {
        const addLangue = await langue.create({ ...req.body })
        res.status(200).send({message: 'Informations enregistrées'})
        console.log({message: 'Informations enregistrées'},addLangue)
    } catch (err) {
        res.status(201).send({message: err.errors[0].message})
        console.log({message: err.errors[0].message},err)
    }
}

const all = async (req, res) => {
    try {
        const allLangue = await langue.findAll({
            attributes: ['idLangue', 'libLangue']
        })
        res.status(200).send(allLangue)
    } catch (err) {
        res.status(201).send({message:"Une erreur s'est produite" })
    }
}

const update = async (req, res) => {
    const info = await langue.findByPk(req.params.id)
    if (info === null) {
        res.status(200).send("ID incorrect")
    } else {
        try{
            const LangueUpdate = await langue.update(
                {
                    libLangue: req.body.libLangue
                },
                {
                    where: {idLangue: req.params.id}
                }
            )
            res.status(200).send({message: 'modifications effectuées'})
        }catch(err){
            res.status(201).send({message: err.errors[0].message})
        }
    }
}
module.exports = { add, all, update }