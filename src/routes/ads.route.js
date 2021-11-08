import adsController from '../controllers/ads.controller.js'

const AdsController = adsController

export default (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'authorization, Origin, Content-Type, Accept'
        )
        next()
    })

    app.get('/api/ads/search', AdsController.search)
    app.get('/api/ads/random', AdsController.random)
    app.get('/api/ads/:id/detail', AdsController.detail)

}