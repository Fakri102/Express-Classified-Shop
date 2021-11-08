import isUserExist from './register.js'
import verifyToken from './authJwt.js'

const middleware = {
    isUserExist,
    verifyToken
}


export default middleware