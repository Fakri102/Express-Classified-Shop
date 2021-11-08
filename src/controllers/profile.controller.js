import db from '../model/index.js'

const User = db.user

const profileController = {
    profile : (req, res) => {
        User.findByPk(req.userId)
        .then((user) => {
            res.status(200).json({
                id : user.id,
                name : user.name,
                phone : user.phone,
                email : user.email
            })
        }).catch((err) => {
            res.status(500).json({
                message : err.message
            })
        })
    }
}


export default profileController
