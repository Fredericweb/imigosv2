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
            res.status(200).json({ message: "enredistrement éffectuée !!" })
            console.log(add)
        }

    } catch (err) {
        res.status(404).json({ message: err.errors[0].message })
        console.log({ message: err.errors[0].message })
    }
}
const allDevise = async (req, res) => {
    try {
        const all = await devise.findAll({
            attributes: ['idDevise', 'libDevise', 'value']
        })
        res.status(200).json(all)

    } catch (err) {
        res.status(404).json({ message: "une erreur s'est produite veuillez contactez l'administrateur " })
        console.lof(err)
    }
}
const update = async (req, res) => {
    console.log(req.body)
    const info = await devise.findByPk(req.params.id)
    if (info === null) {
        res.status(200).json({ message: "utilisateur introuvable" })
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
            res.status(200).json({ message: 'modification effectuée' })
            console.log(deviseUpdate)
        } catch (err) {
            res.status(404).json({ message: err.errors[0].message })
            console.log({ message: err.errors[0].message })
        }
    }

}
const remove = async (req, res) => {
    const verifId = await devise.findByPk(req.params.id)
    if (verifId == null) {
        res.json({ message: 'La devise est introuvable' })
    } else {
        try {
            const removeDevise  = await devise.destroy({
                where: {idDevise : req.params.id}
            })
            res.json({message: "Devise supprimée"})
        } catch(err) {
            res.json({message :  "Une erreur s'est produite"})
            console.log({message :  "Une erreur s'est produite"},err)
        }
    }
}
module.exports = { addDevise, allDevise, update, remove }