import multer from 'multer'
import util from 'util'
import path from "path"


const Multer = multer
const Util = util
const Path = path

const __basedir = Path.resolve()

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb('please upload only image ', false)
    }
}

const stoage = Multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/storage/upload')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})

const uploadImage = Multer({
    storage: stoage,
    fileFilter: imageFilter
}).array('files', 5)

let uploadFile = Util.promisify(uploadImage)

export {uploadFile, __basedir}