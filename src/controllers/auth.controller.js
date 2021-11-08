import dbModel from '../model/index.js'
import authConfig from '../config/auth.js'
import bcryptjs from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'

const db = dbModel
const config = authConfig
const bcrypt = bcryptjs
const jwt = jsonwebtoken

const User = db.user

const authController = {
    register: (req, res) => {
        User.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: bcrypt.hashSync(req.body.password, 8)
        }).then((user)=> {
            res.status(201).json({
                message: 'user was registered successfuly',
            })
        }).catch((err) => {
            res.status(500).json({
                message: err.message
            })
        })
    },

    login : (req, res) => {
        User.findOne({
            where: {
                email : req.body.email
            }
        }).then((user) => {
            if(!user) {
                return res.status(404).json({ message: 'User not found'})
            }

            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

            if(!passwordIsValid) {
                return res.status(401).json({
                    accessToken: null,
                    message: 'invalid password'
                })
            }

            let token = jwt.sign({ id: user.id}, config.secret, {
                expiresIn:86400
            })

            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                accessToken : token
            })
        }).catch((err) => {
            res.status(500).json({
                message: err.message
            })
        });
    }
}


export default authController