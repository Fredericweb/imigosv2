const Db = require('../config/Db')

const langue = Db.langue

const add = async (req, res) => {
    try {
        const addLangue = await langue.create({ ...req.body })
        res.status(200).send(addLangue)
    } catch (err) {
        res.status(201).send('erreur')
        console.log(err)
    }
}

const all = async (req, res) => {
    try {
        const allLangue = await langue.findAll({
            attributes: ['idLangue', 'libLangue']
        })
        res.status(200).send(allLangue)
    } catch (err) {
        res.status(201).send('err')
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
            res.status(200).send({message: 'modification enregistée'})
        }catch(err){
            res.status(201).send({message: "erreur"})
        }
    }
}
module.exports = { add, all, update }