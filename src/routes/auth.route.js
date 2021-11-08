import authController from '../controllers/auth.controller.js'
import middleware from '../middleware/index.js'


const AuthController = authController

export default (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'authorization, Origin, Content-Type, Accept'
        )
        next()
    })

    app.post('/api/auth/register', middleware.isUserExist ,AuthController.register)
    app.post('/api/auth/login', AuthController.login)

}