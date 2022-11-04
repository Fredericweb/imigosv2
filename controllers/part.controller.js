const Db = require('../config/Db')

const part = Db.part

const all = async (req, res) => {
    try {
        const allPart = await part.findAll()
        res.status(201).send(allPart)
    } catch (err) {
        res.status(404).send('erreur')
    }

}

const add = async (req, res) => {
    try {
        const addPart = await part.create({ ...req.body })
        res.status(200).send(addPart)
    } catch (err) {
        res.status(201).send({ message: 'erreur' })
        console.log(err)
    }
}
const update = async (req, res) => {
    const info = await part.findByPk(req.params.id)
    if (info === null) {
        res.status(200).send("ID incorrect")
    } else {
        try{
            const partUpdate = await part.update(
                {
                    libPart: req.body.libPart,
                    partIMI: req.body.partIMI,
                    partGOS: req.body.partGOS,
                    partFiliale: req.Body.partFiliale,
                    idFiliale: req.body.idFiliale,
                    idTypeFact: req.body.idTypeFact
                },
                {
                    where: {idPart: req.params.id}
                }
            )
            res.status(200).send({message: 'modification enregistée'})
        }catch(err){
            res.status(201).send({message: "erreur"})
        }
    }
}

module.exports = { all, add, update }