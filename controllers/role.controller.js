const Db = require('../config/Db')

const role = Db.role

const add = async (req, res) => {
    try {
        const addRole = await role.create({ ...req.body })
        res.status(200).send('enregisterement effectué')
        console.log(addRole)

    } catch (err) {
        res.status(201).send('erreur')
        console.log(err)
    }

}
const all = async (req, res) => {
    try {
        const allRole = await role.findAll({
            atributes: ['idRole', 'libRole']
        })
        console.log(allRole)
        res.status(200).send(allRole)
    } catch (err) {
        res.status(201).send({ message: 'error' })
    }
}
const update = async (req, res) => {
    const info = await role.findByPk(req.params.id)
    if (info === null) {
        res.status(200).send("ID incorrect")
    } else {
        try {
            const updateRole = await role.update(
                {
                    libRole : req.body.libRole
                },
                {
                    where: {idRole: req.params.id}
                }
            )
            res.status(200).send({message: 'modification enregistée'})
            console.log(updateRole)
        } catch (err) {
            res.status(201).send({message: "une erreur s'est produite"})
            console.log(err)
        }
    }
}
module.exports = { add, all, update }