import jsonwebtoken from 'jsonwebtoken'
import authConfig from '../config/auth.js'

const jwt = jsonwebtoken
const config = authConfig

function verifyToken (req, res, next) {
    let token = req.headers['authorization']

    if(!token) {
        return res.status(403).json({
            message : 'no token provided'
        })
    }

    jwt.verify(token, config.secret, (err, decoded) => {

        if(err) {
            return res.status(401).json({
                message : 'unauthorized'
            })
        }

        req.userId = decoded.id
        console.log(decoded);
        next()
    })
}

export default verifyToken

