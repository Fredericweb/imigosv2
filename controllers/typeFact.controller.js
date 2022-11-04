const Db = require('../config/Db')

const typeFact = Db.typeFact

const all = async (req, res) => {
    try{
        const allTypeFact = await typeFact.findAll({
            attributes: ['idTypeFact', 'libTypeFact']
        })
        res.status(200).send(allTypeFact)
    }catch(err){
        res.status(201).send('err')
        console.log(err)
    }
}

const add = async (req, res) => {
    try{
        const addTypeFact = await typeFact.create({...req.body})
        res.status(200).send(addTypeFact)
    }catch(err){
        res.status(201).send({message: "erreur"})
    }
}
const update = async (req, res)=>{
    const info = await typeFact.findByPk(req.params.id)
    if (info === null) {
        res.status(200).send("ID incorrect")
    } else {
        try{
            const typeFactUpdate = await typeFact.update(
                {
                    libTypeFact: req.body.libTypeFact
                },
                {
                    where: {idTypeFact: req.params.id}
                }
            )
            res.status(200).send({message: 'modification enregistée'})
        }catch(err){
            res.status(201).send({message: "erreur"})
        }
    }
}

module.exports = {all, add, update}