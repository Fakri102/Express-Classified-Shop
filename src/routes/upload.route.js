import uploadController from '../controllers/upload.controller.js'
import middleware from '../middleware/index.js'


const UploadController = uploadController

export default (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'authorization, Origin, Content-Type, Accept'
        )
        next()
    })

    app.post('/api/product/:id/upload', middleware.verifyToken , UploadController.upload)
    app.post('/api/image/:id', middleware.verifyToken , UploadController.deleteImageById)

}