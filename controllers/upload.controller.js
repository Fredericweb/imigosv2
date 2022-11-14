const Db = require('../config/Db')
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

const users = Db.users

const uploadProfil = async (req, res) => {
    try {
        if (
            req.file.detectedMimeType != "image/jpg" &&
            req.file.detectedMimeType != "image/png" &&
            req.file.detectedMimeType != "image/jpeg"
        )
            return res.json({ message: "Fichier invalide" })

        if (req.file.size > 500000) return res.json({ message: "Fichier trop volumineux" })
    } catch (err) {
        res.json({ message: "une erreur s'est produite" });
        console.log(err)
    }
    const fileName = req.body.name + ".jpg";

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/profil/${fileName}`
        )
    );

    try {
        const uploadProfil = await users.update(
            { profil: "./uploads/profil/" + fileName },
            { where: { id: req.body.userId } })
        res.json({message: "photo de profil modifiée"})
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

module.exports = { uploadProfil }