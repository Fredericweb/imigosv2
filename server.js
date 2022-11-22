const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config({ path: './config/.env' })
const cors = require('cors')
const port = process.env.PORT

// routes import
const userRoutes = require('./routes/user.routes');
const deviseRoutes = require('./routes/devise.routes')
const roleRoutes = require('./routes/role.routes')
const langueRoutes = require('./routes/langue.routes')
const filialeRoutes = require('./routes/filiale.routes');
const typeFactRoutes = require('./routes/typeFact.routes')
const partRoutes = require('./routes/part.routes')
const taxeRoutes = require('./routes/taxe.routes')
const inventaireRoutes = require('./routes/inventaire.routes')
const factureRoutes = require('./routes/facture.routes')
const etatRoutes = require('./routes/etat.routes')

// middleware import
const { checkUser, requireAuth } = require('./middlewares/auth.middleware')

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// middleware
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
    res.json({ id: res.locals.user.id })
    console.log(res.locals.user.id)
})

// routes
app.use('/api/user', userRoutes);
app.use('/api/devise', deviseRoutes)
app.use('/api/role', roleRoutes)
app.use('/api/langue', langueRoutes)
app.use('/api/filiale', filialeRoutes)
app.use('/api/typefact', typeFactRoutes)
app.use('/api/part', partRoutes)
app.use('/api/taxe', taxeRoutes)
app.use('/api/inventaire', inventaireRoutes)
app.use('/api/facture', factureRoutes)
app.use('/api/etat', etatRoutes)

app.listen(port, () => {
    console.log(`Connecté au port ${port}`)
})

