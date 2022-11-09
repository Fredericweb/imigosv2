const Db = require('../config/Db')

const typeFact = Db.typeFact

const all = async (req, res) => {
    try {
        const allTypeFact = await typeFact.findAll({
            attributes: ['idTypeFact', 'libTypeFact']
        })
        res.status(200).json(allTypeFact)
    } catch (err) {
        res.status(201).json({ message: "une erreur s'est produite" })
        console.log({ message: "une erreur s'est produite" }, err)
    }
}

const add = async (req, res) => {
    try {
        const verifTypeFact = await typeFact.findOne({ where: { libTypeFact: req.body.libTypeFact } })
        if (verifTypeFact) {
            res.json({ message: 'Le type facture existe déjà !!' })
            console.log({ message: 'Le type facture existe déjà !!' })
        } else {
            const addTypeFact = await typeFact.create({ ...req.body })
            res.status(200).json(addTypeFact)
        }

    } catch (err) {
        res.status(201).json({ message: err.errors[0].message })
        console.log({ message: err.errors[0].message }, err)
    }
}
const update = async (req, res) => {
    const info = await typeFact.findByPk(req.params.id)
    if (info === null) {
        res.status(200).json({message: 'Id incorrect'})
    } else {
        try {
            const typeFactUpdate = await typeFact.update(
                {
                    libTypeFact: req.body.libTypeFact
                },
                {
                    where: { idTypeFact: req.params.id }
                }
            )
            res.status(200).json({ message: 'Modification effectuées' })
        } catch (err) {
            res.status(201).json({ message: err.errors[0].message })
            console.log({ message: err.errors[0].message }, err)
        }
    }
}

module.exports = { all, add, update }