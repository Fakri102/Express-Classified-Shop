import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import db from './model/index.js'
import seed from './model/seeds/index.js'
import authRoute from './routes/auth.route.js'
import profileRoute from './routes/profile.route.js'
import productRoute from './routes/product.route.js'
import uploadRoute from './routes/upload.route.js'
import adsRoute from './routes/ads.route.js'
import path from 'path'

const __basedir = path.resolve()

const app = new express();
dotenv.config()


let whiltest = ['http://localhost:8080']
let corsOptions = {
    origin : function(origin, callback) {
        if (whiltest.indexOf(origin) != -1 || !origin) {
            callback(null,true)
        } else {
            callback(new Error('Not Allowed by Cors'))
        }
    }
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('storage'))
app.use('/img', express.static(__basedir + '/storage/upload'))

const database = db
const seeder = seed
database.sequelize
        // .sync({ force : true})
        .sync()
        .then(() => {
            // seeder.userSeed()
            // seeder.categorySeed()
            console.log('database connected')
        })
        .catch((err) => {
            console.error('database connection failed', err.message)
        })

app.get('/', (req, res) => {
    res.json({
        message : 'server is running....'
    })
})
authRoute(app)
profileRoute(app)
productRoute(app)
uploadRoute(app)
adsRoute(app)
const PORT = process.env.APP_PORT

app.listen(PORT, () => {
    console.log(`Server is running in port http://localhost:${PORT}`);
})