const Db = require('../config/Db')
const devise = Db.devise

const addDevise = async (req, res) => {
    console.log({ ...req.body })
    try {
        const verifLibDev = await devise.findOne({ where: { libDevise: req.body.libDevise } })
        if (verifLibDev) {
            res.json({ message: 'La devise existe déjà !!' })
        } else {
            const add = await devise.create({ ...req.body })
            res.status(200).send({ message: "enredistrement éffectuée !!" })
            console.log(add)
        }

    } catch (err) {
        res.status(404).send({ message: err.errors[0].message })
        console.log({ message: err.errors[0].message })
    }
}

const allDevise = async (req, res) => {
    try {
        const all = await devise.findAll({
            attributes: ['idDevise', 'libDevise', 'value']
        })
        res.status(200).send(all)

    } catch (err) {
        res.status(404).send({ message: "une erreur s'est produite veuillez contactez l'administrateur " })
        console.lof(err)
    }
}
const update = async (req, res) => {
    console.log(req.body)
    const info = await devise.findByPk(req.params.id)
    if (info === null) {
        res.status(200).send({ message: "utilisateur introuvable" })
    } else {
        try {
            const deviseUpdate = await devise.update(
                {
                    libDevise: req.body.libDevise,
                    value: req.body.value,
                },
                {
                    where: { idDevise: req.params.id }
                }
            )
            res.status(200).send({ message: 'modification effectuée' })
            console.log(deviseUpdate)
        } catch (err) {
            res.status(404).send({ message: err.errors[0].message })
            console.log({ message: err.errors[0].message })
        }
    }

}

module.exports = { addDevise, allDevise, update }