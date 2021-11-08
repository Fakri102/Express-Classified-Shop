import db from '../index.js'

const User = db.user

function userSeed() {
    User.create({
        name: 'Hakim',
        email: 'hakim@gmail.com',
        phone:'0888',
        password: '$2a$08$Ri25LYKfKRAHBBFhh4B0BuRerhMRAuxkW0WbmFMkpWPOEULmKe6hy'
    })
}

export default userSeed
