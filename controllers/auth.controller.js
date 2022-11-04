const Db = require('../config/Db');
const crypt = require('sequelize-bcrypt')
const jwt = require("jsonwebtoken");
const users = Db.users
const maxAge = 3 * 24 * 60 * 60 * 1000;
crypt(users, {
    field: 'password',
    rounds: 12,
    compare: 'authenticate',
})

const signUp = async (req, res) => {
    console.log({ ...req.body })
    try {
        // verification du login utilisateur
        const verifLogin = await users.findOne({ where: { login: req.body.login } })
        if (verifLogin) {
            res.json({ message: 'Le nom login existe déjà !!' })
        } else {
            const user = await users.create({ ...req.body });
            res.status(200).send(user)
        }

    } catch (err) {
        res.status(404).send({ err })
        console.log('erreur: ', err)
    }

}
const signIn = async (req, res) => {
    const { login, password } = req.body
    const verifUserInfo = await users.findOne({ where: { login: login } })


    if (!verifUserInfo)
        return res.json({ message: 'Login ou mot de passe incorrect' })
    if (!verifUserInfo.authenticate(password))
        return res.json({ message: 'Login ou mot de passe incorrect (mdp)' })
    const token = jwt.sign(
        { id: verifUserInfo.id },
        process.env.JWT_SECRET,
        { expiresIn: maxAge }
    );
    res.cookie('jwt', token, { httpOnly: true, maxAge });
    res.status(200).json({
        message: `Bienvenue ${verifUserInfo.nom} ${verifUserInfo.prenom}`,
        idUser: verifUserInfo.id
    })


}
const all = async (req, res) => {
    try {
        const allUser = await users.findAll({
            attributes: ['id', 'nom', 'prenom', 'login', 'contact', 'profil', 'email', 'idRole']
        })
        res.status(200).send(allUser)
    } catch (err) {
        res.status(404).send('erreur')
        console.log(err)
    }
}
const userInfo = async (req, res) => {
    const info = await users.findByPk(req.params.id)
    if (info === null) {
        res.status(200).send("utilisateur introuvable")
    } else {
        res.status(201).send(info)
    }
}
const update = async (req, res) => {
    const verifId = await users.findByPk(req.params.id)
    const { nom, prenom, login, role, password, email, contact, profil } = req.body
    if (verifId === null) {
        res.json({ message: 'Utilisateur introuvable' })
    } else {
        try {
            const userUpdate = await users.update(
                {
                    nom: nom,
                    prenom: prenom,
                    login: login,
                    role: role,
                    password: password,
                    email: email,
                    contact: contact,
                    profil: profil
                },
                {
                    where: { id: req.params.id }
                }
            )
            res.json({ message: 'modification effectuée' })
        } catch (err) {
            res.json({ message: "Une erreur s'est produite veuillez réessayer" })
        }
    }


}
const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

module.exports = { signUp, all, userInfo, update, signIn, logout }