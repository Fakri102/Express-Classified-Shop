import db from '../model/index.js'
import { getPagination, getPagingData } from '../services/pagination.js'

const Product = db.product
const Image = db.image

const productController = {
    create: (req, res) => {
        if (!req.body.title) {
            res.status(400).json({
                message: 'title must be required'
            })

            return
        }

        const product = {
            user_id: req.userId,
            ...req.body
        }

        Product.create(product).then((result) => {
            res.status(201).json({
                data: result,
                message: "product created succefully"
            })
        }).catch((err) => {
            res.status(500).json({
                message: err.message
            })

        });
    },

    showAll: (req, res) => {
        const { page, size } = req.query
        const { limit, offset } = getPagination(page, size)


        Product.findAndCountAll({
            where: {
                user_id: req.userId
            },
            limit,
            offset,
            include: Image
        }).then((result) => {
            const response = getPagingData(result, page, limit)
            res.status(201).json({
                ...response,
                message: "show all products success"
            })
        }).catch((err) => {
            res.status(500).json({
                message: err.message
            })
        });
    },

    showById: (req, res) => {
        const id = req.params.id

        Product.findByPk(id, {
            include: Image
        })
            .then((result) => {
                if (!result) {
                    res.status(404).json({
                        message: "Product not found"
                    })

                    return
                }

                if (result.user_id != req.userId) {
                    res.status(401).json({
                        message: "unauthorized"
                    })

                    return
                }

                res.status(200).json({
                    data: result,
                    message: "show product success"
                })
            }).catch((err) => {
                res.status(500).json({
                    message: err.message
                })
            });
    },

    updateById: (req, res) => {
        const id = req.params.id

        Product.findByPk(id)
            .then((result) => {
                if (!result) {
                    res.status(404).json({
                        message: "Product not found"
                    })

                    return
                }

                if (result.user_id != req.userId) {
                    res.status(401).json({
                        message: "unauthorized"
                    })

                    return
                }

                Product.update(req.body, {
                    where: {
                        id: id
                    }
                }).then((num) => {
                    if (num == 1) {
                        res.status(200).json({
                            message: 'product update succesfully'
                        })
                    } else {
                        res.status(400).json({
                            message: `cannot update product with id ${id}`
                        })
                    }
                }).catch((err) => {
                    res.status(500).json({
                        message: err.message
                    })
                });
            }).catch((err) => {
                res.status(500).json({
                    message: err.message
                })
            });
    },

    deleteById: (req, res) => {
        const id = req.params.id

        Product.findByPk(id)
            .then((result) => {
                if (!result) {
                    res.status(404).json({
                        message: "Product not found"
                    })

                    return
                }

                if (result.user_id != req.userId) {
                    res.status(401).json({
                        message: "unauthorized data product"
                    })

                    return
                }

                Product.destroy({
                    where: {
                        id: id
                    }
                }).then((num) => {
                    if (num == 1) {
                        res.status(200).json({
                            message: 'product delete succesfully'
                        })
                    } else {
                        res.status(400).json({
                            message: `cannot delete product with id ${id}`
                        })
                    }
                }).catch((err) => {
                    res.status(500).json({
                        message: err.message
                    })
                });
            }).catch((err) => {
                res.status(500).json({
                    message: err.message
                })
            });
    }
}

export default productController