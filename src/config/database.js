import Sequelize from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const config = {
    username : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    host : process.env.DB_HOSTNAME,
    port : process.env.DB_PORT,
    dialect : process.env.DB_DIALECT,
    pool : {
        max : 5,
        min : 0,
        acquire : 30000,
        idle  : 10000
    },
}

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host : config.host,
        port : config.port,
        dialect : config.dialect,
    },
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

export default db