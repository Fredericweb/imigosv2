const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config({path:'./config/.env'})
const port = process.env.PORT
// middleware import
const {checkUser, requireAuth} = require('./middlewares/auth.middleware')

// routes import
const userRoutes = require('./routes/user.routes');
const deviseRoutes = require('./routes/devise.routes')
const roleRoutes = require('./routes/role.routes')
const langueRoutes= require('./routes/langue.routes')
const filialeRoutes = require('./routes/filiale.routes');
const typeFactRoutes = require('./routes/typeFact.routes')
const partRoutes = require('./routes/part.routes')
const taxeRoutes = require('./routes/taxe.routes')
const inventaireRoutes = require('./routes/inventaire.routes')
const factureRoutes = require('./routes/facture.routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

// middleware
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res)=>{
    // res.status(500).send(res.locals.user.id)
})

// routes
app.use('/api/user', userRoutes);
app.use('/api/devise', deviseRoutes)
app.use('/api/role', roleRoutes )
app.use('/api/langue', langueRoutes)
app.use('/api/filiale' ,filialeRoutes)
app.use('/api/typefact', typeFactRoutes)
app.use('/api/part', partRoutes)
app.use('/api/taxe', taxeRoutes)
app.use('/api/inventaire', inventaireRoutes)
app.use('/api/facture', factureRoutes)

app.listen(port, ()=>{
    console.log(`Connecté au port ${port}`)
})

