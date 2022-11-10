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
                    ...req.body
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
const remove = async (req, res) => {
    const verifId = await part.findByPk(req.params.id)
    if(verifId == null){
        res.json({message : "Elémant introuvable"})
    }else{
        try{
            const removePart = await part.destroy({
                where: {idPart: req.params.id}
            })
            res.json({message: "Elément supprimé"})
        }catch(err){
            res.json({message: "Une erreur s'est produite"})
            console.log(err)
        }
    }
}
module.exports = { all, add, update, remove }