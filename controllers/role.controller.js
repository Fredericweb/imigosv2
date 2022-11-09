const Db = require('../config/Db')

const role = Db.role

const add = async (req, res) => {
    try {
        const verifRole = await role.findOne({ where: { libRole: req.body.libRole } })
        if (verifRole) {
            res.json({ message: 'Le rôle existe déjà !!' })
            console.log({ message: 'Le rôle existe déjà !!' })
        } else {
            const addRole = await role.create({ ...req.body })
            res.status(200).json({ message: 'enregisterement effectué' })
            console.log({ message: 'enregisterement effectué' }, addRole)
        }

    } catch (err) {
        res.status(201).json({ message: err.errors[0].message })
        console.log({ message: err.errors[0].message }, err)
    }

}
const all = async (req, res) => {
    try {
        const allRole = await role.findAll({
            atributes: ['idRole', 'libRole']
        })
        console.log(allRole)
        res.status(200).json(allRole)
    } catch (err) {
        res.status(201).json({ message: "une erreur s'est produite" })
    }
}
const update = async (req, res) => {
    const info = await role.findByPk(req.params.id)
    if (info === null) {
        res.status(200).json("ID incorrect")
    } else {
        try {
            const updateRole = await role.update(
                {
                    libRole: req.body.libRole
                },
                {
                    where: { idRole: req.params.id }
                }
            )
            res.status(200).json({ message: 'modification enregistée' })
            console.log(updateRole)
        } catch (err) {
            res.status(201).json({ message: err.errors[0].message })
            console.log({ message: err.errors[0].message })
        }
    }
}
module.exports = { add, all, update }