import productController from '../controllers/product.controller.js'
import middleware from '../middleware/index.js'


const ProductController = productController

export default (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'authorization, Origin, Content-Type, Accept'
        )
        next()
    })

    app.post('/api/product', middleware.verifyToken , ProductController.create)
    app.get('/api/product', middleware.verifyToken , ProductController.showAll)
    app.get('/api/product/:id', middleware.verifyToken , ProductController.showById)
    app.patch('/api/product/:id', middleware.verifyToken , ProductController.updateById)
    app.delete('/api/product/:id', middleware.verifyToken , ProductController.deleteById)



}