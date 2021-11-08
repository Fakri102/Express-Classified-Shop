import profileController from '../controllers/profile.controller.js'
import middleware from '../middleware/index.js'


const ProfileController = profileController

export default (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'authorization, Origin, Content-Type, Accept'
        )
        next()
    })

    app.get('/api/profile', middleware.verifyToken , ProfileController.profile)
}