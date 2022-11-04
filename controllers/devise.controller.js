const Db = require('../config/Db')
const devise = Db.devise

const addDevise = async (req, res) => {
    console.log({ ...req.body })
    try {
        const add = await devise.create({ ...req.body })
        res.status(200).send(add)
    } catch (err) {
        res.status(404).send('erreur')
        console.log(err)
    }
}

const allDevise = async (req, res) => {
    try {
        const all = await devise.findAll({
            attributes: ['idDevise', 'libDevise', 'value']
        })
        res.status(200).send(all)

    } catch (err) {
        res.status(404).send('err')
        console.lof(err)
    }
}
const update = async (req, res) => {
    console.log(req.body)
    const info = await devise.findByPk(req.params.id)
    if (info === null) {
        res.status(200).send("utilisateur introuvable")
    } else {
        try {
            const deviseUpdate = await devise.update(
                {
                    value: req.body.value
                },
                {
                    where: { idDevise: req.params.id }
                }
            )
            res.status(200).send({ message: 'modification effectuée' })
            console.log(deviseUpdate)
        } catch (err) {
            res.status(201).send({ message: "une erreur s'est produite lors de la modification " })
            console.log(err)
            console.log(req.body)
        }
    }

}

module.exports = { addDevise, allDevise, update }