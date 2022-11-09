const Db = require('../config/Db')

const part = Db.part

const all = async (req, res) => {
    try {
        const allPart = await part.findAll()
        res.status(201).json(allPart)
    } catch (err) {
        res.status(404).json({ message: "une erreur s'est produite" })
    }

}

const add = async (req, res) => {

    try {

        const addPart = await part.create({ ...req.body })
        res.status(200).json({ message: "Informations enregistrées" })
        console.log({ message: "Informations enregistrées" }, addPart)


    } catch (err) {
        res.status(201).json({ message: err.errors[0].message })
        console.log({ message: err.errors[0].message }, err)
    }
}
const update = async (req, res) => {
    const info = await part.findByPk(req.params.id)
    if (info === null) {
        res.status(200).json({ message: "ID incorrect" })
    } else {
        try {
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
                    where: { idPart: req.params.id }
                }
            )
            res.status(200).json({ message: 'Modification effectuée' })
        } catch (err) {
            res.status(201).json({ message: err.errors[0].message })
        }
    }
}

module.exports = { all, add, update }