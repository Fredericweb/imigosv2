const Db = require('../config/Db')

const filiale = Db.filiale

const add = async (req, res) => {
    try {
        const verifFiliale = await filiale.findOne({ where: { libFiliale: req.body.libFiliale } })
        if (verifFiliale) {
            res.json({ message: 'La filiale existe déjà !!' })
            console.log({ message: 'Le filiale existe déjà !!' })
        } else {
            const addFiliale = await filiale.create({ ...req.body })
            res.status(200).json({message: "informations enregistrées"},addFiliale)
        }
       
    } catch (err) {
        res.status(404).json({message:err.errors[0].message })
        console.log({message:err.errors[0].message })
    }

}
const all = async (req, res) => {
    try {
        const allFiliale = await filiale.findAll({
            attributes: ['idFiliale', 'libFiliale', 'sigle', 'idLangue', 'idDevise']
        })
        console.log(allFiliale)
        res.status(200).json(allFiliale)
        console.log(allFiliale)
    } catch (err) {
        res.status(200).json({message: "une erreur s'est produite"})
        console.log({message: "une erreur s'est produite"},err)

    }

}

const update = async (req, res) => {
    const { libFiliale, sigle, idDevise, idLangue } = req.body
    const info = await filiale.findByPk(req.params.id)
    if (info === null) {
        res.status(200).json({message:"utilisateur introuvable"})
    } else {
        try {
            const filialeUpdate = await filiale.update(
                {
                    libFiliale: libFiliale,
                    sigle: sigle,
                    idDevise: idDevise,
                    idLangue: idLangue,
                },
                {
                    where: { idFiliale: req.params.id }
                }
            )
            console.log(req.params.id)
            res.status(200).json({ message: 'modification effectuée' })
            console.log({ message: 'modification effectuée' })
        } catch (err) {
            res.status(201).json({message:err.errors[0].message })
            console.log({message:err.errors[0].message })
        }
    }

}
module.exports = { add, all, update }