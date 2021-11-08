import { uploadFile, __basedir } from "../services/upload.js"
import fs from 'fs'
import db from "../model/index.js"

const Image = db.image


const uploadController = {
    upload: async (req, res) => {
        const id = req.params.id

        try {
            await uploadFile(req, res)
            if (req.files == undefined) {
                return res.status(400).json({
                    message: 'please upload a file'
                })
            }

            let images = req.files.map((item) => {
                const image = {}
                image.product_id = id
                image.file = item.filename
                return image
            })

            Image.bulkCreate(images).then((result) => {
                res.status(201).json({
                    message: 'upload a files succesfully'
                })
            }).catch((err) => {
                res.status(201).json({
                    message: 'upload a files failed'
                })

            });
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    },

    deleteImageById: (req, res) => {
        const id = req.params.id

        Image.findByPk(id)
            .then((data) => {
                fs.unlink(__basedir + `/storage/upload/${data.file}`, (err) => {
                    if (err) {
                        throw res.status(500).json({
                            message: 'delete image failed'
                        })
                    }

                    Image.destroy({
                        where: {
                            id: id
                        }
                    }).then((num) => {
                        if (num == 1) {
                            res.status(200).json({
                                message: 'image was deleted succesfully'
                            })
                        } else {
                            res.status(500).json({
                                message: `Cannot delete images with id=${id}`
                            })
                        }
                    }).catch((err) => {
                        res.status(500).json({
                            message: err.message,
                        })
                    });
                })

            }).catch((err) => {
                res.statut(500).json({
                    message: err.message
                })
            });

    }
}


export default uploadController